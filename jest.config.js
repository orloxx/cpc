module.exports = {
  verbose: true,
  bail: true,
  setupFiles: ['<rootDir>/tests/mocks/setupFiles.js'],
  modulePathIgnorePatterns: ['<rootDir>/tests/mocks/'],
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.js$': 'esbuild-jest'
  }
}
