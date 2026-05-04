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
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        // Harmony 2 cool blue palette
        bone:   '#f8fbfe',
        ivory:  {
          DEFAULT: '#ecf4fb',
          deep:    '#dfeaf7',
          warm:    '#d4e3f3',
        },
        sand: {
          DEFAULT: '#c9daee',
          soft:    '#d8e8f6',
        },
        forest: {
          DEFAULT: '#1565c9',
          deep:    '#07172d',
          soft:    '#3d8fd9',
        },
        sage: {
          DEFAULT: '#5c92c4',
          light:   '#a8cff0',
          pale:    '#cfe8fb',
        },
        sky: {
          DEFAULT: '#38bdf8',
          deep:    '#0284c7',
          pale:    '#bae6fd',
          bright:  '#7dd3fc',
        },
        // Aliases preserved for legacy code
        terracotta: {
          DEFAULT: '#38bdf8',
          deep:    '#0284c7',
          pale:    '#bae6fd',
        },
        gold: {
          DEFAULT: '#38bdf8',
          deep:    '#0369a1',
          pale:    '#e0f2fe',
        },
        ink: {
          DEFAULT: '#071524',
          soft:    '#1e3a55',
          mute:    '#5a6e82',
        },

        // Legacy "medical" + "accent" tokens — remapped onto cool-blue
        medical: {
          50:  '#dfeaf7',
          100: '#cfe8fb',
          200: '#a8cff0',
          400: '#5c92c4',
          500: '#3d8fd9',
          600: '#1565c9',
          700: '#1565c9',
          800: '#07172d',
          900: '#07172d',
        },
        accent: {
          50:  '#bae6fd',
          100: '#bae6fd',
          400: '#38bdf8',
          500: '#38bdf8',
          600: '#0284c7',
          700: '#0284c7',
        },
      },
    },
  },
  plugins: [],
};
