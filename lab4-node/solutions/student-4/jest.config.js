export default {
  bail: 1,
  verbose: false,
  testEnvironment: 'node',
  transform: {}, // важно для ESM, отключает Babel
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/tests/**'
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70
    }
  },
  testTimeout: 10000
};