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
                sans: ['"Century Gothic"', 'sans-serif'],
                serif: ['"Century Gothic"', 'sans-serif'],
            },
            colors: {
                medical: {
                    50: '#f0f9ff',   // sky-50 (light background)
                    100: '#e0f2fe',  // sky-100
                    500: '#0ea5e9',  // sky-500 (primary interface blue)
                    600: '#0284c7',  // sky-600 (hover state)
                    800: '#075985',  // sky-800 (dark text/background)
                    900: '#0c4a6e',  // sky-900 (deep navy)
                },
                accent: {
                    500: '#0d9488', // Teal-600 (Calm, distinct accent)
                    600: '#0f766e', // Teal-700
                }
            }
        }
    },
    plugins: [],
}
