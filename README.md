# GeneVeda Biosciences Website

A modern, professional website for GeneVeda Biosciences - a multidisciplinary biotech organization dedicated to advancing research, technology, and education in biosciences.

## Overview

GeneVeda Biosciences specializes in:
- **R&D Services**: Molecular biology, biotechnology, aptamer, NGS, AMR, microbiology
- **Bioinformatics Analysis**: Genomics, transcriptomics, proteomics, metagenomics
- **Next-Generation Sequencing**: Whole genome, RNA-Seq, metagenomics, variant analysis
- **Diagnostics & Aptamers**: Advanced diagnostic solutions
- **Training Programs**: Industry-focused training in molecular biology, bioinformatics, coding
- **Study Abroad Guidance**: International education support in life sciences

## Features

- 🎨 Modern, responsive design inspired by BRF Chennai and Uscholars
- 🚀 Built with Next.js 16, React 19, and TypeScript
- 🎭 Smooth animations using Framer Motion
- 📱 Fully responsive and mobile-friendly
- 🎯 SEO-optimized with proper metadata
- ⚡ Fast performance with static generation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: MySQL
- **Backend**: Next.js API Routes (separated from database layer)
- **Architecture**: Service-Repository pattern for clean separation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MySQL 8.0+ (local or remote)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your MySQL database credentials

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server will start at [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=geneveda_biosciences
DB_PORT=3306
```

**Setting up MySQL:**

> 🚀 **New to SQL?** Check out our [Database Setup Guide](./DATABASE_README.md) for step-by-step instructions!

**Quick Setup:**
```bash
# Run the complete automated setup (easiest!)
npm run setup-complete
```

Or follow these steps manually:
1. Install MySQL 8.0+ on your system or use Docker: `npm run setup-db`
2. Create `.env.local` file (copy from `env.example.txt`)
3. Create the database: `npm run create-db`
4. Initialize tables: `npm run init-db`
5. Test connection: `npm run test-db`

For detailed guides, see:
- **[Quick Start Guide](./QUICK_START_DATABASE.md)** - Fast 3-step setup
- **[Beginner's Guide](./BEGINNER_DATABASE_SETUP.md)** - Detailed explanations
- **[Complete Database Guide](./DATABASE_README.md)** - All options and troubleshooting

## Project Structure

```
geneveda-biosciences/
├── app/
│   ├── api/
│   │   └── blogs/          # Blog API routes (GET, POST, PUT, DELETE)
│   ├── blog/               # Blog pages
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage with all sections
│   ├── globals.css         # Global styles
│   └── favicon.ico         # Site favicon
├── lib/
│   └── db/
│       ├── connection.ts   # MySQL connection pool
│       └── migrations.ts    # Database schema migrations
├── services/
│   ├── blogService.ts      # Business logic layer
│   └── repositories/
│       └── blogRepository.ts  # Data access layer
├── public/                 # Static assets
├── package.json            # Dependencies
└── README.md               # This file
```

## Sections

The homepage includes:

1. **Hero Section**: Main introduction with CTA buttons
2. **Stats Section**: Key metrics and achievements
3. **Services Section**: Overview of all services offered
4. **R&D Division**: Detailed information about research services
5. **Bioinformatics Section**: Computational analysis capabilities
6. **Training Programs**: Industry-focused training offerings
7. **Study Abroad**: Global education guidance
8. **About Section**: Company mission and values
9. **Contact Form**: Get in touch section
10. **Footer**: Links and contact information

## Customization

### Colors

The site uses an emerald/teal color scheme. To change colors, update Tailwind classes:
- Primary: `emerald-600`, `emerald-700`
- Secondary: `teal-50`, `teal-100`
- Background: `gray-50`, `white`

### Content

Edit `app/page.tsx` to update:
- Company information
- Services descriptions
- Contact details
- Statistics

### Metadata

Update SEO metadata in `app/layout.tsx`:
- Title
- Description
- Keywords

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## API Routes

### Blog API

- `GET /api/blogs` - Get all blog posts (with filters: category, featured, search, limit)
- `GET /api/blogs/[slug]` - Get single blog post by slug
- `GET /api/blogs/[id]` - Get blog post by ID (for admin)
- `POST /api/blogs` - Create new blog post (protected - add auth)
- `PUT /api/blogs/[id]` - Update blog post (protected - add auth)
- `DELETE /api/blogs/[id]` - Delete blog post (protected - add auth)

### Example API Usage

```typescript
// Fetch all blogs
const response = await fetch('/api/blogs');
const data = await response.json();

// Fetch by category
const response = await fetch('/api/blogs?category=Research');

// Search blogs
const response = await fetch('/api/blogs?search=sequencing');

// Get single blog
const response = await fetch('/api/blogs/introduction-to-ngs');
```

## Future Enhancements

- [x] Blog/News section with API routes
- [ ] Individual service pages
- [ ] Training program details pages
- [ ] Study abroad destination pages
- [ ] Case studies/Portfolio
- [ ] Admin dashboard for content management
- [ ] Authentication for blog CRUD operations
- [ ] Image upload for blog posts (Cloudinary integration)
- [ ] Backend API for contact form
- [ ] Email notifications
- [ ] Multi-language support

## License

Copyright © 2025 GeneVeda Biosciences. All rights reserved.

## Contact

For questions or support, please contact:
- Email: info@geneveda.com
- Phone: +91 XXX XXX XXXX
- Location: Chennai, Tamil Nadu, India
