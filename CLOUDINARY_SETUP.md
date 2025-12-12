# Cloudinary Image Upload Setup

## Overview
The blog admin panel now supports image uploads via Cloudinary. Users can upload images directly from their device instead of entering URLs.

## Features
- ✅ Image upload from device
- ✅ Image preview before upload
- ✅ Remove image with cross (X) button
- ✅ All images stored in `geneveda` folder on Cloudinary
- ✅ Works on both Add and Edit blog pages

## Setup Instructions

### 1. Create Cloudinary Account
1. Go to https://cloudinary.com/
2. Sign up for a free account
3. After signup, you'll be taken to the dashboard

### 2. Get Your Credentials
1. In Cloudinary dashboard, go to **Settings** → **Security**
2. Copy these values:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### 3. Add to Environment Variables

Add these to your `.env.local` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**For Vercel Deployment:**
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all three Cloudinary variables
4. Redeploy your application

### 4. Create Geneveda Folder (Optional)
The folder `geneveda` will be created automatically when you upload the first image. However, you can also create it manually in Cloudinary dashboard:
1. Go to **Media Library**
2. Click **Create Folder**
3. Name it `geneveda`

## How It Works

### Upload Flow
1. User clicks on upload area or selects file
2. Image preview shows immediately
3. Image uploads to Cloudinary in background
4. Once uploaded, Cloudinary URL is saved to form
5. On form submit, image URL is saved to database

### Remove Image
- Click the red X button on image preview
- Image is removed from form (not deleted from Cloudinary)
- User can upload a new image

## API Endpoints

### POST `/api/upload`
Uploads an image to Cloudinary.

**Request:**
- Method: `POST`
- Body: `FormData` with `file` field

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/.../geneveda/image.jpg",
  "public_id": "geneveda/image"
}
```

### DELETE `/api/upload?public_id=...`
Deletes an image from Cloudinary (not currently used in UI, but available).

## Image Storage Structure

All images are stored in Cloudinary with this structure:
```
geneveda/
  ├── image1.jpg
  ├── image2.png
  └── ...
```

## Troubleshooting

### Upload Fails
1. Check Cloudinary credentials in `.env.local`
2. Verify API key and secret are correct
3. Check Cloudinary dashboard for upload limits
4. Verify file size (should be under 10MB)

### Image Not Showing
1. Check if image URL is saved in database
2. Verify Cloudinary URL is accessible
3. Check browser console for CORS errors

### Environment Variables Not Working
1. Restart dev server after adding env variables
2. For Vercel, ensure variables are added and app is redeployed
3. Check variable names match exactly (case-sensitive)

## Security Notes

- API Secret should NEVER be exposed to client-side
- Keep `.env.local` in `.gitignore`
- Use environment variables in production
- Consider adding upload size limits
- Consider adding file type validation

## Free Tier Limits

Cloudinary free tier includes:
- 25 GB storage
- 25 GB monthly bandwidth
- Unlimited transformations
- Auto-optimization

For production with high traffic, consider upgrading to a paid plan.


