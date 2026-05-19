// CORS configuration - restrict origins for security
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001,https://mmes-mcti.com,https://www.mmes-mcti.com,https://mmes-website-production.up.railway.app,*.vercel.app').split(',');

export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  for (const allowed of ALLOWED_ORIGINS) {
    const pattern = allowed.trim();
    if (pattern === origin) return true;
    // Support *.vercel.app wildcard
    if (pattern.startsWith('*.')) {
      const suffix = pattern.slice(1); // e.g., .vercel.app
      try {
        const hostname = new URL(origin).hostname;
        if (hostname.endsWith(suffix)) return true;
      } catch {
        // origin might not be a full URL, try direct suffix match
        if (origin.endsWith(suffix)) return true;
      }
    }
  }
  return false;
}

export const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function getCorsHeaders(requestOrigin: string | null): Record<string, string> {
  const headers: Record<string, string> = { ...corsHeaders };

  if (requestOrigin && isOriginAllowed(requestOrigin)) {
    headers['Access-Control-Allow-Origin'] = requestOrigin;
  }

  return headers;
}
