# Mukesh Sridharan - Data Analyst Portfolio

A modern, minimalistic portfolio website built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion. This portfolio showcases my work as a Data Analyst specializing in data automation, Python-PostgreSQL pipelines, and Power BI dashboards.

## 🚀 Features

- **Modern Design**: Ultra-minimalistic design with generous whitespace and subtle colorful accents
- **Smooth Animations**: Framer Motion powered animations throughout the site
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Dark Theme**: Dark theme with vibrant color accents
- **Glassmorphism Effects**: Modern glassmorphism cards with backdrop blur
- **Scroll Animations**: Scroll-triggered fade-in and slide-up animations
- **Interactive Elements**: Hover effects on all cards, buttons, and links
- **Performance Optimized**: Fast page load times and smooth 60fps animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```


3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

To build the production version:

```bash
npm run build
```

The static export will be in the `out` directory.

## 📄 Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and animations
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section with particles
│   ├── About.tsx           # About section with stats
│   ├── Skills.tsx          # Skills section
│   ├── Experience.tsx      # Professional experience timeline
│   ├── Projects.tsx        # Featured projects
│   ├── Achievements.tsx    # Key achievements with counters
│   ├── Education.tsx       # Education & certifications
│   ├── Contact.tsx         # Contact form and info
│   └── Footer.tsx          # Footer component
├── public/
│   └── resume.pdf          # Resume PDF (add your own)
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions deployment workflow
```
 
## 🚢 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites

1. A GitHub repository named `Portfolio` (or update the basePath in `next.config.js`)
2. GitHub Pages enabled in repository settings

### Setup Instructions

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Configure Repository Name:**
   - If your repository is not named `Portfolio`, update the `basePath` and `assetPrefix` in `next.config.js`:
   ```javascript
   basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   ```

4. **Automatic Deployment:**
   - The GitHub Actions workflow will automatically deploy your site on every push to the `main` branch
   - Check the **Actions** tab in your repository to monitor deployment status
   - Your site will be available at: `https://yourusername.github.io/Portfolio/`

### Manual Deployment

If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. The static files will be in the `out` directory. You can upload these to any static hosting service.

3. For GitHub Pages manual upload:
   - Create a `gh-pages` branch
   - Copy the contents of `out` to the root of the `gh-pages` branch
   - Push to GitHub
   - Enable GitHub Pages in repository settings to use the `gh-pages` branch

## 🎨 Customization

### Colors

The color scheme is defined in `tailwind.config.ts`. You can customize:

- Primary colors (blues)
- Secondary colors (purples)
- Teal accents
- Background gradients

### Content

Update the content in each component file:
- Personal information in `components/Hero.tsx`
- About section in `components/About.tsx`
- Skills in `components/Skills.tsx`
- Experience in `components/Experience.tsx`
- Projects in `components/Projects.tsx`
- Achievements in `components/Achievements.tsx`
- Education & Certifications in `components/Education.tsx`
- Contact info in `components/Contact.tsx`

### Resume PDF

Add your resume PDF to the `public` folder as `resume.pdf`.

### Favicon

Add your favicon to the `public` folder and update the link in `app/layout.tsx`.

## 🔧 Configuration

### Next.js Config

The project is configured for static export in `next.config.js`:

```javascript
output: 'export',
images: {
  unoptimized: true,
},
basePath: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
```

Update the `basePath` if your repository has a different name.

### Environment Variables

No environment variables are required for static export. All content is hardcoded in the frontend.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Tips

- Images are optimized using Next.js Image component (with unoptimized flag for static export)
- Lazy loading for below-the-fold sections
- Minimal bundle size
- Optimized animations for 60fps performance

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mukesh Sridharan**

- Email: Mukesh7522@gmail.com
- LinkedIn: [linkedin.com/in/mukesh7522](https://linkedin.com/in/mukesh7522)
- GitHub: [github.com/Mukesh7522](https://github.com/Mukesh7522)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

---

**Note**: Make sure to replace placeholder content with your actual information before deploying.



