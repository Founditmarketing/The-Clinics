/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        // Legacy alias kept so existing pages don't break.
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        // Harmony palette — primary tokens
        ivory: {
          DEFAULT: '#FAF7F2',
          deep: '#F2EDE3',
          warm: '#EDE6D6',
        },
        forest: {
          DEFAULT: '#1F3A2E',
          deep: '#142319',
          soft: '#2D4A3C',
        },
        sage: {
          DEFAULT: '#7A9885',
          light: '#B8C9BD',
          pale: '#DCE4DD',
        },
        terracotta: {
          DEFAULT: '#C97B5A',
          deep: '#A85F3F',
          pale: '#E8C5B0',
        },
        gold: {
          DEFAULT: '#B8924A',
          deep: '#8F6F36',
          pale: '#E8D9B8',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#4A4A4A',
          mute: '#8A8A8A',
        },

        // Legacy "medical" + "accent" tokens — remapped onto the new
        // palette so existing pages absorb the redesign automatically.
        medical: {
          50:  '#F2EDE3', // ivory-deep
          100: '#DCE4DD', // sage-pale
          200: '#B8C9BD', // sage-light
          400: '#7A9885', // sage
          500: '#2D4A3C', // forest-soft
          600: '#1F3A2E', // forest
          700: '#1F3A2E',
          800: '#142319', // forest-deep
          900: '#142319',
        },
        accent: {
          50:  '#E8C5B0', // terracotta-pale
          100: '#E8C5B0',
          400: '#C97B5A', // terracotta
          500: '#C97B5A',
          600: '#A85F3F', // terracotta-deep
          700: '#A85F3F',
        },
      },
    },
  },
  plugins: [],
};
