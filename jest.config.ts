export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  rootDir: 'src',
  moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.module.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    '^@app/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  coveragePathIgnorePatterns: [
    '/node_module/',
    '<rootDir>/config/db.config.ts'
  ]
  
};