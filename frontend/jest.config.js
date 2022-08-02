const nextJest = require('next/jest')

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({dir: './'})

module.exports = createJestConfig({
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  coverageReporters: [
    'html'
  ],
})
