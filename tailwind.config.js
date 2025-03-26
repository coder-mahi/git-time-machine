module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          'github-dark': '#0d1117',
          'github-darker': '#010409',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  };