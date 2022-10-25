// https://tailwindcss.com/docs/installation#create-your-configuration-file
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      container: {
        center: true,
        margin: 'auto',
        padding: '2rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px'
        }
      },
      maxWidth: {
        60: '60%'
      }
    }
  },
  variants: {},
  plugins: [],
  future: {}
}
