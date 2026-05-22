import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders } from '../../../lib/cors';
import { requireAuth } from '../../../lib/auth-middleware';

const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY;
const UPLOADCARE_SECRET_KEY = process.env.UPLOADCARE_SECRET_KEY;
const UPLOADCARE_CDN_HOST = process.env.UPLOADCARE_CDN_HOST || '61mzpm7grh.ucarecd.net';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

async function uploadToUploadcare(buffer: Buffer, fileName: string, contentType: string): Promise<{ url: string; raw: unknown }> {
  const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
  const CRLF = '\r\n';

  const header = Buffer.from([
    `--${boundary}${CRLF}`,
    `Content-Disposition: form-data; name="UPLOADCARE_PUB_KEY"${CRLF}`,
    `${CRLF}`,
    `${UPLOADCARE_PUBLIC_KEY}${CRLF}`,
    `--${boundary}${CRLF}`,
    `Content-Disposition: form-data; name="file"; filename="${fileName}"${CRLF}`,
    `Content-Type: ${contentType}${CRLF}`,
    `${CRLF}`,
  ].join(''), 'utf8');

  const footer = Buffer.from(`${CRLF}--${boundary}--${CRLF}`, 'utf8');
  const body = Buffer.concat([header, buffer, footer]);

  const res = await fetch('https://upload.uploadcare.com/base/', {
    method: 'POST',
    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body,
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Uploadcare HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Uploadcare non-JSON: ${text.slice(0, 300)}`);
  }

  if (!data.file) {
    throw new Error(`Uploadcare missing file uuid: ${JSON.stringify(data)}`);
  }

  const url = `https://${UPLOADCARE_CDN_HOST}/${data.file}/`;
  return { url, raw: data };
}

export async function POST(request: NextRequest) {
  const headers = getCorsHeaders(request.headers.get('origin'));

  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: '没有文件' }, { status: 400, headers });
    }

    if (!file.type || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: '请上传图片文件' }, { status: 400, headers });
    }

    if (!UPLOADCARE_PUBLIC_KEY || !UPLOADCARE_SECRET_KEY) {
      return NextResponse.json({ error: 'Uploadcare not configured' }, { status: 500, headers });
    }

    const lastDot = file.name.lastIndexOf('.');
    const ext = lastDot >= 0 ? file.name.slice(lastDot).toLowerCase() : '.jpg';
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: '不支持的图片格式' }, { status: 400, headers });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ts = Date.now();
    const baseName = file.name.slice(0, lastDot >= 0 ? lastDot : undefined).replace(/[^a-zA-Z0-9]/g, '-');
    const fileName = `${baseName}-${ts}${ext}`;

    const result = await uploadToUploadcare(buffer, fileName, file.type);

    return NextResponse.json({
      url: result.url,
      raw: result.raw,
      cdn: UPLOADCARE_CDN_HOST,
    }, { headers });

  } catch (err) {
    console.error('Upload error:', err);
    const message = err instanceof Error ? err.message : '上传失败';
    return NextResponse.json({ error: message }, { status: 500, headers });
  }
}

export async function OPTIONS(request: NextRequest) {
  const headers = getCorsHeaders(request.headers.get('origin'));
  return new NextResponse(null, { status: 204, headers });
}
