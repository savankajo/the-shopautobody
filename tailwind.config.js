/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': 'hsl(var(--color-primary) / <alpha-value>)',
        'brand-dark': 'hsl(var(--color-background) / <alpha-value>)',
        'brand-gray': 'hsl(var(--color-card) / <alpha-value>)',
        'brand-light-gray': 'hsl(var(--color-border) / <alpha-value>)',
        // New dynamic text colors
        'text-heading': 'hsl(var(--color-text-heading) / <alpha-value>)',
        'text-body': 'hsl(var(--color-text-body) / <alpha-value>)',
        'text-muted': 'hsl(var(--color-text-muted) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'part', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
