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
                    50: '#f9fafb',   // slate-50
                    100: '#f3f4f6',  // slate-100
                    500: '#ef4444',  // red-500
                    600: '#dc2626',  // red-600
                    800: '#991b1b',  // red-800
                    900: '#000000',  // black
                },
                accent: {
                    500: '#ef4444', // Red
                    600: '#dc2626', // Darker Red
                }
            }
        }
    },
    plugins: [],
}
