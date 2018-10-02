module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/lib/",
    "<rootDir>/lib-esm/",
    "<rootDir>/umd/",
    "<rootDir>/src/.*(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$"
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/'
}
