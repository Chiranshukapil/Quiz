/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    filter: {
      'hue-rotate-240': 'hue-rotate(240deg)',
      'hue-rotate-180': 'hue-rotate(180deg)',
      'hue-rotate-70': 'hue-rotate(70deg)',
      'saturate-150': 'saturate(1.5)',
      'saturate-200': 'saturate(2)',
      'saturate-125': 'saturate(1.25)',
      'brightness-90': 'brightness(0.9)',
      'brightness-95': 'brightness(0.95)'
    }
  },
};
export const plugins = [];
