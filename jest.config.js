const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig = {
  collectCoverage: true,
  collectCoverageFrom: [
    './script/**/*.ts',
    './lib/**/*.ts',
    './src/**/*.ts',
    './src/**/*.tsx',
    './utils/**/*.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.test.(ts|tsx)'
  ]
};

module.exports = createJestConfig(customJestConfig);
