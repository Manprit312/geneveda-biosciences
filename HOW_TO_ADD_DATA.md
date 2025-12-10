# 📝 How to Add Data to Live Database - GeneVeda Biosciences

This guide explains all the ways you can add data to your live/production database.

## 🎯 Quick Overview

GeneVeda uses **MySQL** database with the following main tables:
- `blogs` - Blog posts
- `services` - Service pages
- `page_content` - Page sections/content
- `site_settings` - Global site settings
- `admins` - Admin users

---

## 🔧 Step 1: Configure Database Connection

### For Production/Live Database

1. **Create/Update `.env.local` file** in the project root:

```env
DB_HOST=your_live_db_host
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
DB_PORT=3306
DB_SSL=false
```

> **Note:** For most hosting providers (like Hostinger, cPanel), `DB_HOST` is usually `localhost` when your app runs on the same server as MySQL.

2. **Verify connection:**
```bash
npm run test-db
```

---

## 📊 Method 1: Add Data via Admin Panel (Recommended)

### Prerequisites
1. **Create an admin account first:**
```bash
npm run create-admin
```

2. **Login to admin panel:**
   - Navigate to: `https://your-domain.com/admin/login`
   - Use your admin credentials

### Adding Blog Posts
1. Go to: `/admin/blogs/new`
2. Fill in the form:
   - Title
   - Slug (URL-friendly version, e.g., "my-blog-post")
   - Excerpt
   - Content (HTML supported)
   - Author & Author Role
   - Category (Research, NGS, Bioinformatics, Training, Study Abroad)
   - Tags (comma-separated)
   - Featured checkbox
   - Published checkbox
3. Click "Create Blog Post"

### Adding Services
1. Go to: `/admin/services/new`
2. Fill in:
   - Slug (e.g., "ngs-sequencing")
   - Title
   - Description
   - Content (full page content)
   - Icon (optional)
   - Featured & Active checkboxes
   - Order Index (for sorting)
   - Meta Title & Meta Description (SEO)
3. Click "Create Service"

### Adding Page Content
1. Go to: `/admin/page-content/new`
2. Fill in:
   - Page Slug (which page this content belongs to)
   - Section Key (unique identifier for this section)
   - Title
   - Content
   - Content Type (text, html, json)
   - Order Index
   - Active checkbox
3. Click "Create Page Content"

---

## 🔌 Method 2: Add Data via API Routes

### Authentication Required
Most API routes require admin authentication. You'll need to:
1. Login via `/api/admin/auth/login` to get a JWT token
2. Include the token in the `Authorization` header: `Bearer <your-token>`

### Adding Blog Posts via API

**Endpoint:** `POST /api/blogs`

**Example using cURL:**
```bash
curl -X POST https://your-domain.com/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My New Blog Post",
    "slug": "my-new-blog-post",
    "excerpt": "This is a short description",
    "content": "<p>Full blog content here...</p>",
    "author": "John Doe",
    "authorRole": "Senior Researcher",
    "category": "Research",
    "tags": ["science", "research", "genomics"],
    "readTime": "5 min read",
    "featured": true,
    "published": true
  }'
```

**Example using JavaScript/TypeScript:**
```typescript
const response = await fetch('https://your-domain.com/api/blogs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: "My New Blog Post",
    slug: "my-new-blog-post",
    excerpt: "This is a short description",
    content: "<p>Full blog content here...</p>",
    author: "John Doe",
    authorRole: "Senior Researcher",
    category: "Research",
    tags: ["science", "research"],
    featured: true,
    published: true
  })
});

const data = await response.json();
```

### Adding Services via API

**Endpoint:** `POST /api/admin/services`

```bash
curl -X POST https://your-domain.com/api/admin/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "slug": "ngs-sequencing",
    "title": "NGS Sequencing Services",
    "description": "Next-generation sequencing services",
    "content": "<p>Full service description...</p>",
    "featured": true,
    "active": true,
    "order_index": 1
  }'
```

---

## 💻 Method 3: Add Data Directly via SQL

### Connect to MySQL Database

**Via Command Line:**
```bash
mysql -h your_db_host -u your_username -p your_database_name
```

**Via phpMyAdmin (if available):**
- Login to your hosting control panel
- Open phpMyAdmin
- Select your database

### SQL Examples

#### Insert Blog Post
```sql
INSERT INTO blogs (
  title, slug, excerpt, content, author, author_role, category,
  tags, read_time, featured, published, published_at
) VALUES (
  'My New Blog Post',
  'my-new-blog-post',
  'Short description here',
  '<p>Full content here...</p>',
  'John Doe',
  'Senior Researcher',
  'Research',
  '["science", "research"]',
  '5 min read',
  1,
  1,
  NOW()
);
```

#### Insert Service
```sql
INSERT INTO services (
  slug, title, description, content, featured, active, order_index
) VALUES (
  'ngs-sequencing',
  'NGS Sequencing Services',
  'Next-generation sequencing services',
  '<p>Full service description...</p>',
  1,
  1,
  1
);
```

#### Insert Page Content
```sql
INSERT INTO page_content (
  page_slug, section_key, title, content, content_type, order_index, active
) VALUES (
  'home',
  'hero-section',
  'Welcome to GeneVeda',
  '<h1>Welcome to our website</h1>',
  'html',
  1,
  1
);
```

#### Insert Site Setting
```sql
INSERT INTO site_settings (
  setting_key, setting_value, setting_type, description
) VALUES (
  'site_name',
  'GeneVeda Biosciences',
  'text',
  'Website name'
);
```

---

## 🛠️ Method 4: Using Database Scripts

### Seed Blogs (if script exists)
```bash
npm run seed-blogs
```

### Create Admin User
```bash
npm run create-admin
```

---

## 📋 Required Fields for Each Table

### Blogs Table
- ✅ **Required:** `title`, `slug`, `excerpt`, `content`, `author`, `category`
- ⚪ **Optional:** `author_role`, `tags`, `image`, `read_time`, `featured`, `published`

### Services Table
- ✅ **Required:** `slug`, `title`
- ⚪ **Optional:** `description`, `content`, `icon`, `featured`, `active`, `order_index`, `meta_title`, `meta_description`

### Page Content Table
- ✅ **Required:** `page_slug`, `section_key`
- ⚪ **Optional:** `title`, `content`, `content_type`, `order_index`, `active`

### Site Settings Table
- ✅ **Required:** `setting_key`
- ⚪ **Optional:** `setting_value`, `setting_type`, `description`

---

## 🔍 Verify Data Was Added

### Check via API
```bash
# Get all blogs
curl https://your-domain.com/api/blogs

# Get all services
curl https://your-domain.com/api/services

# Get specific blog by slug
curl https://your-domain.com/api/blogs/my-blog-slug
```

### Check via Database
```sql
SELECT * FROM blogs ORDER BY created_at DESC LIMIT 10;
SELECT * FROM services WHERE active = 1;
SELECT * FROM page_content WHERE active = 1;
```

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot connect to database"
**Solution:**
1. Check `.env.local` file exists and has correct values
2. Verify database credentials
3. Ensure MySQL server is running
4. Check if `DB_HOST` is correct (try `localhost` for same-server hosting)

### Issue: "Access denied"
**Solution:**
1. Verify username and password
2. Check user has permissions on the database
3. Ensure database name is correct

### Issue: "Table doesn't exist"
**Solution:**
```bash
npm run init-db
```

### Issue: "Duplicate entry for slug"
**Solution:**
- Slugs must be unique. Change the slug to something else.

---

## 📚 API Endpoints Reference

### Public Endpoints (No Auth Required)
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/[slug]` - Get blog by slug
- `GET /api/services` - Get all active services
- `GET /api/page-content` - Get page content
- `GET /api/settings` - Get site settings

### Admin Endpoints (Auth Required)
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/admin/[id]` - Update blog
- `DELETE /api/blogs/admin/[id]` - Delete blog
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/[id]` - Update service
- `DELETE /api/admin/services/[id]` - Delete service
- `POST /api/admin/page-content` - Create page content
- `PUT /api/admin/page-content/[id]` - Update page content
- `DELETE /api/admin/page-content/[id]` - Delete page content

---

## ✅ Best Practices

1. **Always use the admin panel** for regular content updates (easiest)
2. **Use API routes** for automated/bulk imports
3. **Use SQL directly** only for one-time migrations or fixes
4. **Test in development** before adding to production
5. **Backup database** before making bulk changes
6. **Use unique slugs** - they're used in URLs
7. **Set `published: false`** for drafts, `true` for live content

---

## 🎉 Quick Start Checklist

- [ ] Database connection configured in `.env.local`
- [ ] Database connection tested (`npm run test-db`)
- [ ] Admin user created (`npm run create-admin`)
- [ ] Admin panel accessible at `/admin/login`
- [ ] Ready to add data via admin panel or API!

---

**Need Help?** Check the main `DATABASE_README.md` for setup instructions.




