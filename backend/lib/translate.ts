const MYMEMORY_API = process.env.TRANSLATION_API_URL || 'https://api.mymemory.translated.net/get';
const GOOGLE_TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2';
const GOOGLE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

interface TranslationResult {
  success: boolean;
  translatedText: string;
  error?: string;
}

async function translateWithGoogle(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResult> {
  if (!GOOGLE_API_KEY) {
    return { success: false, translatedText: '', error: 'Google Translate API key not configured' };
  }

  try {
    const langPair = sourceLang === 'en' ? 'en' : sourceLang;
    const target = targetLang === 'en' ? 'en' : targetLang;

    const response = await fetch(
      `${GOOGLE_TRANSLATE_API}?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: langPair,
          target: target,
          format: 'text',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData?.error?.message || `HTTP ${response.status}`;
      return { success: false, translatedText: '', error: errorMsg };
    }

    const data = await response.json();
    if (data.data?.translations?.[0]?.translatedText) {
      return {
        success: true,
        translatedText: data.data.translations[0].translatedText,
      };
    } else {
      return { success: false, translatedText: '', error: 'Invalid response from Google Translate' };
    }
  } catch (error) {
    return {
      success: false,
      translatedText: '',
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

async function translateWithMyMemory(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResult> {
  try {
    const langPair = `${sourceLang}|${targetLang}`;
    const url = `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langPair)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData) {
      return {
        success: true,
        translatedText: data.responseData.translatedText,
      };
    } else {
      return {
        success: false,
        translatedText: '',
        error: data.responseDetails || 'Translation failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      translatedText: '',
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResult> {
  if (!text || text.trim() === '') {
    return { success: true, translatedText: '' };
  }

  if (sourceLang === targetLang) {
    return { success: true, translatedText: text };
  }

  // Try Google Translate first
  if (GOOGLE_API_KEY) {
    const googleResult = await translateWithGoogle(text, sourceLang, targetLang);
    if (googleResult.success) {
      return googleResult;
    }
    console.log('Google Translate failed, falling back to MyMemory:', googleResult.error);
  }

  // Fallback to MyMemory
  return translateWithMyMemory(text, sourceLang, targetLang);
}

export async function translateContent(
  content: Record<string, { name: string; description: string }>,
  sourceLang: string,
  targetLangs: string[]
): Promise<Record<string, { name: string; description: string }>> {
  const result: Record<string, { name: string; description: string }> = {};
  result[sourceLang] = { ...content[sourceLang] };

  await Promise.all(
    targetLangs.map(async (lang) => {
      if (lang === sourceLang) return;

      const sourceContent = content[sourceLang] || { name: '', description: '' };

      const [nameResult, descResult] = await Promise.all([
        sourceContent.name ? translateText(sourceContent.name, sourceLang, lang) : Promise.resolve({ success: true, translatedText: '' }),
        sourceContent.description ? translateText(sourceContent.description, sourceLang, lang) : Promise.resolve({ success: true, translatedText: '' }),
      ]);

      result[lang] = {
        name: nameResult.success ? nameResult.translatedText : sourceContent.name,
        description: descResult.success ? descResult.translatedText : sourceContent.description,
      };
    })
  );

  return result;
}

interface ProductSpec {
  name: string;
  value: string;
  unit?: string;
}

export async function translateProductContent(
  content: Record<string, { name: string; description: string }>,
  specs: Record<string, ProductSpec[]>,
  sourceLang: string,
  targetLangs: string[]
): Promise<{ content: Record<string, { name: string; description: string }>; specs: Record<string, ProductSpec[]> }> {
  const result: Record<string, { name: string; description: string }> = {};
  result[sourceLang] = { ...content[sourceLang] };

  const specsResult: Record<string, ProductSpec[]> = {};
  specsResult[sourceLang] = (specs[sourceLang] || []).map(spec => ({ ...spec }));

  // Translate each target language in parallel
  await Promise.all(
    targetLangs.map(async (lang) => {
      if (lang === sourceLang) return;

      const sourceContent = content[sourceLang] || { name: '', description: '' };
      const sourceSpecs = specs[sourceLang] || [];

      // Build all translation tasks for this language
      const tasks: Promise<{ key: string; text: string }>[] = [];

      if (sourceContent.name) {
        tasks.push(
          translateText(sourceContent.name, sourceLang, lang).then(r => ({
            key: 'content.name',
            text: r.success ? r.translatedText : sourceContent.name,
          }))
        );
      }
      if (sourceContent.description) {
        tasks.push(
          translateText(sourceContent.description, sourceLang, lang).then(r => ({
            key: 'content.description',
            text: r.success ? r.translatedText : sourceContent.description,
          }))
        );
      }

      // Queue all spec translations
      sourceSpecs.forEach((spec, i) => {
        if (spec.name) {
          tasks.push(
            translateText(spec.name, sourceLang, lang).then(r => ({
              key: `spec.${i}.name`,
              text: r.success ? r.translatedText : spec.name,
            }))
          );
        }
        if (spec.value) {
          tasks.push(
            translateText(spec.value, sourceLang, lang).then(r => ({
              key: `spec.${i}.value`,
              text: r.success ? r.translatedText : spec.value,
            }))
          );
        }
        if (spec.unit) {
          tasks.push(
            translateText(spec.unit, sourceLang, lang).then(r => ({
              key: `spec.${i}.unit`,
              text: r.success ? r.translatedText : spec.unit,
            }))
          );
        }
      });

      // Execute all translations in parallel
      const results = await Promise.all(tasks);

      // Assemble results
      const targetContent: { name: string; description: string } = { name: sourceContent.name, description: sourceContent.description };
      const targetSpecs: ProductSpec[] = sourceSpecs.map(spec => ({ ...spec }));

      for (const r of results) {
        const parts = r.key.split('.');
        if (parts[0] === 'content') {
          (targetContent as Record<string, string>)[parts[1]] = r.text;
        } else if (parts[0] === 'spec') {
          const idx = parseInt(parts[1]);
          (targetSpecs[idx] as Record<string, string>)[parts[2]] = r.text;
        }
      }

      result[lang] = targetContent;
      specsResult[lang] = targetSpecs;
    })
  );

  return { content: result, specs: specsResult };
}

export async function translateBlogContent(
  content: Record<string, { title: string; excerpt: string; content: string }>,
  sourceLang: string,
  targetLangs: string[]
): Promise<Record<string, { title: string; excerpt: string; content: string }>> {
  const result: Record<string, { title: string; excerpt: string; content: string }> = {};
  result[sourceLang] = { ...content[sourceLang] };

  // Translate each target language in parallel
  await Promise.all(
    targetLangs.map(async (lang) => {
      if (lang === sourceLang) return;

      const sourceContent = content[sourceLang] || { title: '', excerpt: '', content: '' };

      const [titleResult, excerptResult, contentResult] = await Promise.all([
        sourceContent.title ? translateText(sourceContent.title, sourceLang, lang) : Promise.resolve({ success: true, translatedText: '' }),
        sourceContent.excerpt ? translateText(sourceContent.excerpt, sourceLang, lang) : Promise.resolve({ success: true, translatedText: '' }),
        sourceContent.content ? translateText(sourceContent.content, sourceLang, lang) : Promise.resolve({ success: true, translatedText: '' }),
      ]);

      result[lang] = {
        title: titleResult.success ? titleResult.translatedText : sourceContent.title,
        excerpt: excerptResult.success ? excerptResult.translatedText : sourceContent.excerpt,
        content: contentResult.success ? contentResult.translatedText : sourceContent.content,
      };
    })
  );

  return result;
}