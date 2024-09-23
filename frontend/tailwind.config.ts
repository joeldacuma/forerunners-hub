import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import { nextui } from '@nextui-org/react'

export default {
  content: [
    './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'xs': '640px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'light-blue': '#38b6ff'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        sans: [
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
} satisfies Config
