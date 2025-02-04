module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // Resolve path aliases
    },
    globals: {
      'ts-jest': {
        isolatedModules: true,  // Helps with performance when testing
      },
    },
  };
  