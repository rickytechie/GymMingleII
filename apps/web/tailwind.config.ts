import type { Config } from 'tailwindcss'
import baseConfig from '../../tailwind.config.js'

export default {
  ...baseConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/core/src/**/*.{ts,tsx}',
  ],
} satisfies Config
