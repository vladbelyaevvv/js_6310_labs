export default {
  bail: 1,
  verbose: false,
  testEnvironment: 'node',
  transform: {},

  // считаем покрытие по юнит-коду (repo, validators)
  collectCoverageFrom: [
    'src/bot/repo/**/*.js',
    'src/bot/validators/**/*.js',
    '!src/bot/index.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70 }
  }
};
