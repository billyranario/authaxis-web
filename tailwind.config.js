module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'theme-primary': '#71C2FF',
        'theme-primary-light': '#A8D7FA',
        'theme-primary-dark': '#1766a3',
        'theme-secondary': '#444B54',
        'theme-secondary-light': '#444B5469',
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
  corePlugins: {
    cursor: true,
  }
};
