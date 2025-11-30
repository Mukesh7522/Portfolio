# Portfolio Setup Guide

## Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Add Your Resume:**
   - Export your resume as a PDF
   - Place it in the `public` folder as `resume.pdf`
   - This will be accessible at `/resume.pdf`

3. **Add Favicon (Optional):**
   - Generate a favicon at [favicon.io](https://favicon.io/)
   - Place it in the `public` folder as `favicon.ico`
   - Or update the favicon link in `app/layout.tsx`

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

## Important Notes

### Resume PDF
The resume download button links to `/resume.pdf`. Make sure to:
- Add your resume PDF to the `public` folder
- Name it exactly `resume.pdf`
- If you use a different name, update the links in:
  - `components/Hero.tsx`
  - `components/Contact.tsx`

### GitHub Pages Deployment
- The repository name is configured as `Portfolio` in `next.config.js`
- If your repository has a different name, update the `basePath` and `assetPrefix` in `next.config.js`
- Make sure to enable GitHub Pages in repository settings and select "GitHub Actions" as the source

### Custom Domain
If you want to use a custom domain:
1. Update `next.config.js` to remove or modify `basePath` and `assetPrefix`
2. Add a `CNAME` file in the `public` folder with your domain name
3. Configure DNS settings according to GitHub Pages documentation

## File Locations for Updates

- **Personal Info**: `components/Hero.tsx`
- **About Section**: `components/About.tsx`
- **Skills**: `components/Skills.tsx`
- **Experience**: `components/Experience.tsx`
- **Projects**: `components/Projects.tsx`
- **Achievements**: `components/Achievements.tsx`
- **Education**: `components/Education.tsx`
- **Contact Info**: `components/Contact.tsx`
- **Colors**: `tailwind.config.ts`
- **Metadata**: `app/layout.tsx`

## Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Deployment Issues
- Check GitHub Actions logs in the "Actions" tab
- Verify `basePath` matches your repository name
- Ensure GitHub Pages is enabled in repository settings

### Missing Resume
- The resume link will show a 404 if `resume.pdf` is missing
- Add your resume PDF to the `public` folder before deploying

## Next Steps

1. Customize the content in each component
2. Add your resume PDF
3. Test locally with `npm run dev`
4. Push to GitHub
5. Monitor deployment in GitHub Actions
6. Share your portfolio URL!

