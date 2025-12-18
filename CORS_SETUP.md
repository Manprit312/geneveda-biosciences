# CORS Setup for Geneveda API

This document explains how to configure CORS (Cross-Origin Resource Sharing) for the Geneveda API to allow requests from NewsBlogs or other external domains.

## Current Setup

CORS has been enabled on the following API routes:
- `/api/categories` - For NewsBlogs category management
- `/api/newsblogs` - For NewsBlogs blog management

## Configuration

### Option 1: Environment Variables (Recommended)

Add your NewsBlogs Vercel URL to your `.env` file:

```env
# Single URL
NEXT_PUBLIC_NEWSBLOGS_URL=https://your-newsblogs.vercel.app
# OR
NEWSBLOGS_URL=https://your-newsblogs.vercel.app

# Multiple URLs (comma-separated)
ALLOWED_ORIGINS=https://your-newsblogs.vercel.app,https://another-domain.com
```

### Option 2: Update CORS Helper

Edit `lib/cors.ts` and add your NewsBlogs URL to the `allowedOrigins` array:

```typescript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://geneveda-biosciences.vercel.app',
  'https://your-newsblogs.vercel.app', // Add your NewsBlogs URL here
  // ...
];
```

## Vercel Deployment

When deploying to Vercel:

1. **Add Environment Variables in Vercel Dashboard:**
   - Go to your Geneveda project settings
   - Add `NEXT_PUBLIC_NEWSBLOGS_URL` or `ALLOWED_ORIGINS` with your NewsBlogs URL

2. **Redeploy** after adding environment variables

## Testing CORS

You can test CORS by making a request from NewsBlogs:

```javascript
// In NewsBlogs frontend
const response = await fetch('https://geneveda-biosciences.vercel.app/api/categories', {
  method: 'GET',
  credentials: 'include', // If using cookies
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Important Notes

1. **Development Mode**: In development, all origins are allowed for easier testing
2. **Production**: Only explicitly allowed origins will be accepted
3. **Credentials**: CORS is configured to allow credentials (cookies, auth headers)
4. **Preflight**: OPTIONS requests are automatically handled for CORS preflight

## Adding CORS to Other API Routes

To add CORS to other API routes, import and use the helper:

```typescript
import { addCorsHeaders, handleCorsPreflight } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflight(request) || new NextResponse(null, { status: 200 });
}

export async function GET(request: NextRequest) {
  // Your logic here
  const response = NextResponse.json({ data: '...' });
  return addCorsHeaders(response, request);
}
```

