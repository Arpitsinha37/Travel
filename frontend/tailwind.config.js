/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'nepal-red': '#DC143C', // Simrik Red
                'nepal-blue': '#003893', // Deep Blue
                'temple-gold': '#DAA520', // Gold
            }
        },
    },
    plugins: [],
}
