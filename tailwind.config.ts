import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:               '#030712',
        surface:          '#0c1220',
        'surface-2':      '#111827',
        'accent-blue':    '#38bdf8',
        'accent-violet':  '#818cf8',
        'accent-emerald': '#34d399',
        'accent-pink':    '#f472b6',
        'accent-amber':   '#fbbf24',
      },
      fontFamily: {
        display: ['Syne',           'sans-serif'],
        body:    ['Space Grotesk',  'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
