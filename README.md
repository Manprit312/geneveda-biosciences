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

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server will start at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
geneveda-biosciences/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage with all sections
│   ├── globals.css         # Global styles
│   └── favicon.ico         # Site favicon
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

## Future Enhancements

- [ ] Individual service pages
- [ ] Training program details pages
- [ ] Study abroad destination pages
- [ ] Blog/News section
- [ ] Case studies/Portfolio
- [ ] Admin dashboard for content management
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
