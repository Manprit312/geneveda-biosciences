import { NextRequest, NextResponse } from 'next/server';

/**
 * CORS helper function to add CORS headers to API responses
 * Allows requests from NewsBlogs and other allowed origins
 */
export function addCorsHeaders(response: NextResponse, request: NextRequest): NextResponse {
  const origin = request.headers.get('origin');
  
  // Allowed origins - add your NewsBlogs Vercel URL here
  // You can set these in your .env file:
  // ALLOWED_ORIGINS=https://your-newsblogs.vercel.app,https://another-domain.com
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://geneveda-biosciences.vercel.app',
    // Add your NewsBlogs Vercel URL when deployed
    process.env.NEXT_PUBLIC_NEWSBLOGS_URL,
    process.env.NEWSBLOGS_URL,
    // Support comma-separated list from env
    ...(process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || []),
  ].filter(Boolean) as string[];

  // Check if origin is allowed
  // Allow exact match or subdomain match
  const isAllowedOrigin = origin && allowedOrigins.some(allowed => {
    if (origin === allowed) return true;
    // Allow subdomains (e.g., *.vercel.app)
    const allowedDomain = allowed.replace(/^https?:\/\//, '');
    const originDomain = origin.replace(/^https?:\/\//, '');
    return originDomain === allowedDomain || originDomain.endsWith('.' + allowedDomain);
  });

  // Set CORS headers
  if (isAllowedOrigin && origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development') {
    // In development, allow all origins for easier testing
    if (origin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours

  return response;
}

/**
 * Handle OPTIONS request for CORS preflight
 */
export function handleCorsPreflight(request: NextRequest): NextResponse | null {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 });
    return addCorsHeaders(response, request);
  }
  return null;
}

