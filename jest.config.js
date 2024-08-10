/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    "@core/(.*)$": "<rootDir>/src/core/$1",
    "@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
    "@application/(.*)$": "<rootDir>/src/application/$1",
    "@test/(.*)$": "<rootDir>/test/$1"
  },
};
