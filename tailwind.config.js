/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
      container: { center: true, padding: '1rem' },
      extend: {
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        },
        colors: {
          brand: {
            50:  '#eef6ff',
            100: '#d9ebff',
            200: '#b7d9ff',
            300: '#8fc3ff',
            400: '#62a6ff',
            500: '#3b82f6', // base
            600: '#2f6bd9',
            700: '#2856af',
            800: '#234a90',
            900: '#1f3d75',
          },
        },
        boxShadow: {
          soft: '0 8px 30px rgba(0,0,0,0.08)',
          glass: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 24px rgba(0,0,0,0.08)',
        },
        backgroundImage: {
          'mesh':
            'radial-gradient(30rem 30rem at -10% -10%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(24rem 24rem at 110% 10%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(18rem 18rem at 50% 120%, rgba(16,185,129,0.12) 0%, transparent 60%)',
        },
      },
    },
    plugins: [],
  }
  