# Admin Panel Setup Guide

This guide will help you set up and use the admin panel for GeneVeda Biosciences.

## Features

The admin panel provides a comprehensive interface to manage:
- **Blogs**: Create, edit, delete, and manage blog posts
- **Services**: Manage service pages dynamically
- **Page Content**: Edit sections of any page
- **Site Settings**: Manage global site settings

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

This will install the required packages including `bcryptjs` and `jsonwebtoken` for authentication.

### 2. Initialize Database

Make sure your database is initialized with all the required tables:

```bash
npm run init-db
```

This will create:
- `blogs` table (if not exists)
- `admins` table
- `services` table
- `page_content` table
- `site_settings` table

### 3. Create Admin User

Create your first admin user:

```bash
npm run create-admin
```

This will create a default admin with:
- Email: `admin@geneveda.com`
- Password: `admin123`
- Username: `admin`
- Role: `superadmin`

**⚠️ IMPORTANT: Change the password immediately after first login!**

You can also create a custom admin:

```bash
npm run create-admin email@example.com yourpassword username "Full Name"
```

### 4. Set JWT Secret (Optional but Recommended)

Add to your `.env.local`:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

If not set, a default key will be used (not recommended for production).

## Accessing the Admin Panel

1. Navigate to `/admin/login` in your browser
2. Log in with your admin credentials
3. You'll be redirected to the dashboard at `/admin/dashboard`

## Admin Panel Structure

### Dashboard (`/admin/dashboard`)
- Overview statistics
- Quick access to common tasks
- Blog and content metrics

### Blogs (`/admin/blogs`)
- View all blog posts
- Create, edit, delete blogs
- Filter and search blogs
- View published/draft status

### Services (`/admin/services`)
- Manage service pages
- Create new services
- Edit service content
- Activate/deactivate services

### Page Content (`/admin/page-content`)
- Manage content sections for any page
- Edit homepage sections
- Update service page content
- Organize content by page

### Settings (`/admin/settings`)
- Manage global site settings
- Configure contact information
- Update site metadata

## Making Content Dynamic

### For Service Pages

1. Go to `/admin/services`
2. Create or edit a service
3. The frontend will automatically fetch and display this content

The service pages will now be dynamic. Update the frontend service pages to fetch from the API:

```typescript
// Example: app/services/training/page.tsx
const response = await fetch('/api/services?slug=training');
const { service } = await response.json();
```

### For Homepage Sections

1. Go to `/admin/page-content?page=home`
2. Create content sections with unique `section_key` values
3. Fetch these sections in your homepage component

### For Site Settings

Use the settings API to fetch global settings:

```typescript
const response = await fetch('/api/settings?key=contact_email');
const { setting } = await response.json();
```

## API Endpoints

### Public Endpoints (No Authentication)

- `GET /api/services` - Get all active services
- `GET /api/services?slug=xxx` - Get specific service
- `GET /api/page-content?pageSlug=xxx` - Get page content
- `GET /api/settings` - Get all settings
- `GET /api/settings?key=xxx` - Get specific setting

### Admin Endpoints (Authentication Required)

- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `GET /api/admin/auth/me` - Get current admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET/POST/PUT/DELETE /api/admin/services` - Manage services
- `GET/POST/PUT/DELETE /api/admin/page-content` - Manage page content
- `GET/POST/PUT/DELETE /api/admin/settings` - Manage settings
- `GET/PUT/DELETE /api/blogs/admin/[id]` - Manage blogs

## Security Notes

1. **Change Default Password**: Always change the default admin password
2. **Use Strong JWT Secret**: Set a strong `JWT_SECRET` in production
3. **HTTPS in Production**: Always use HTTPS in production
4. **Admin Routes**: All admin routes are protected with JWT authentication
5. **Session Management**: Admin sessions last 7 days (configurable)

## Troubleshooting

### Cannot Login
- Check if admin user exists: `SELECT * FROM admins;`
- Verify password is correct
- Check database connection

### Database Errors
- Run `npm run init-db` to create tables
- Check `.env.local` for correct database credentials

### 401 Unauthorized Errors
- Make sure you're logged in
- Check if your session expired (login again)
- Verify JWT_SECRET is set correctly

## Next Steps

1. Create your admin account
2. Update service pages to fetch dynamic content
3. Add homepage sections via page content
4. Configure site settings
5. Start creating content!

For support, check the database connection and ensure all tables are created properly.

