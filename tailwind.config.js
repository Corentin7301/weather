/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        'mine-shaft': {
          '50': '#f4f4f4',
          '100': '#eaeaea',
          '200': '#cacaca',
          '300': '#aaaaaa',
          '400': '#6b6b6b',
          '500': '#2b2b2b',
          '600': '#272727',
          '700': '#202020',
          '800': '#1a1a1a',
          '900': '#151515'
        },
        'fuel-yellow': {
          '50': '#fffbf5', 
          '100': '#fef7ea', 
          '200': '#fdebcb', 
          '300': '#fbdfab', 
          '400': '#f9c66c', 
          '500': '#f6ae2d', 
          '600': '#dd9d29', 
          '700': '#b98322', 
          '800': '#94681b', 
          '900': '#795516'
      }
      },
      fontFamily: {
        Karla: ['Karla', 'sans-serif'],
      },
    },
    plugins: [],
  }
}