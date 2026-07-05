import type { Config } from 'tailwindcss'
import baseConfig from '../../tailwind.config.js'

export default {
  ...baseConfig,
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/core/src/**/*.{ts,tsx}',
  ],
} satisfies Config
