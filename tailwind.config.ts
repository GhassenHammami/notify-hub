import type { Config } from 'tailwindcss'

export default {
  content: ['./inertia/**/*.{js,ts,jsx,tsx}', './resources/views/**/*.edge'],
  theme: {
    extend: {},
  },
} satisfies Config
