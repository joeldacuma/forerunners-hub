import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

export default {
  content: [
    './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0369a1',
        'light-blue': '#38b6ff',
        'light-violet': '#b55ef1',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  darkMode: ['class', 'class'],
  plugins: [
    nextui({
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            focus: '#38b6ff',
          },
        },
      },
    }),
    require('tailwindcss-animate'),
  ],
} satisfies Config
