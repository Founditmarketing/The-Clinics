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
        // Cardinal Cenla — warm ivory + deep navy + cardinal red
        bone:   '#fbf8f1',
        ivory:  {
          DEFAULT: '#f7f3ec',
          deep:    '#ede6d6',
          warm:    '#f0e2cd',
        },
        sand: {
          DEFAULT: '#e0d3bb',
          soft:    '#ede4cf',
        },
        forest: {
          DEFAULT: '#1f3a5b',
          deep:    '#0c1c2e',
          soft:    '#3a5e85',
        },
        sage: {
          DEFAULT: '#6b7a8a',
          light:   '#b6c2cf',
          pale:    '#dde3eb',
        },
        cardinal: {
          DEFAULT: '#c1352a',
          deep:    '#971f15',
          pale:    '#f4d4d0',
          bright:  '#de574a',
        },
        // Aliases preserved for legacy code
        terracotta: {
          DEFAULT: '#c1352a',
          deep:    '#971f15',
          pale:    '#f4d4d0',
        },
        gold: {
          DEFAULT: '#c19451',
          deep:    '#8b6633',
          pale:    '#ede1c8',
        },
        ink: {
          DEFAULT: '#1a1d24',
          soft:    '#3d424c',
          mute:    '#74787f',
        },

        // Legacy "medical" + "accent" tokens — remapped onto the new
        // navy authority palette so old pages absorb the redesign.
        medical: {
          50:  '#ede6d6',
          100: '#dde3eb',
          200: '#b6c2cf',
          400: '#6b7a8a',
          500: '#3a5e85',
          600: '#1f3a5b',
          700: '#1f3a5b',
          800: '#0c1c2e',
          900: '#0c1c2e',
        },
        accent: {
          50:  '#f4d4d0',
          100: '#f4d4d0',
          400: '#de574a',
          500: '#c1352a',
          600: '#971f15',
          700: '#971f15',
        },
      },
    },
  },
  plugins: [],
};
