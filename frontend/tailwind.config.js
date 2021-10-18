module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors : {
        'redPiquant': '#464e56',
        'violetClair': "#693bb9"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
