# Git Repository Setup Instructions

## ✅ Local Repository Status
- Git repository initialized ✓
- All files committed ✓
- Ready to push to remote

## 📋 Steps to Push to GitHub

### Option 1: Using GitHub Website (Recommended)

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `geneveda-biosciences`
   - Description: "GeneVeda Biosciences - Bioscience Research Blog Website"
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Connect and push your code:**
   ```bash
   cd /Users/rupindersingh/manprit-workspace/Services/geneveda-biosciences
   
   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/geneveda-biosciences.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Option 2: Using SSH (If you have SSH keys set up)

```bash
cd /Users/rupindersingh/manprit-workspace/Services/geneveda-biosciences

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin git@github.com:YOUR_USERNAME/geneveda-biosciences.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option 3: Using GitHub CLI (If installed)

```bash
cd /Users/rupindersingh/manprit-workspace/Services/geneveda-biosciences

# Create and push in one command
gh repo create geneveda-biosciences --public --source=. --remote=origin --push
```

## 📝 Current Commit Status

**Latest Commit:**
```
Initial commit: GeneVeda Biosciences website with blog functionality
- Complete homepage with services, training, and study abroad sections
- Blog listing page with search and category filters
- Individual blog post pages with related articles
- Responsive design with modern UI
- Framer Motion animations
- SEO optimized
```

**Files Committed:**
- ✅ Homepage (app/page.tsx)
- ✅ Blog listing page (app/blog/page.tsx)
- ✅ Blog post pages (app/blog/[slug]/page.tsx)
- ✅ Layout and metadata (app/layout.tsx)
- ✅ README.md
- ✅ package.json with dependencies

## 🔐 Authentication

If you encounter authentication issues:

1. **For HTTPS:** Use a Personal Access Token instead of password
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` permissions
   - Use token as password when prompted

2. **For SSH:** Make sure your SSH key is added to GitHub
   - Check: `ssh -T git@github.com`
   - If not set up, follow: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

## 🚀 After Pushing

Once pushed, you can:
- View your repository at: `https://github.com/YOUR_USERNAME/geneveda-biosciences`
- Deploy to Vercel: Connect your GitHub repo to Vercel for automatic deployments
- Set up CI/CD: Add GitHub Actions for automated testing and deployment

## 📦 Next Steps

After pushing to GitHub, consider:
1. Setting up GitHub Pages for static hosting
2. Connecting to Vercel/Netlify for automatic deployments
3. Adding GitHub Actions for CI/CD
4. Setting up branch protection rules
5. Adding collaborators if working in a team

