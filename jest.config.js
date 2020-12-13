module.exports = {
  projects: [
    {
      displayName: 'default-tests',
      runner: 'jest-runner',
      preset: '@shelf/jest-mongodb',
    },
    {
      displayName: 'serial-tests',
      runner: 'jest-serial-runner',
      testMatch: ['**/?(*.)+(serial-test).[jt]s?(x)'],
      preset: '@shelf/jest-mongodb',
    },
  ],
  roots: ['<rootDir>/tests'],
  verbose: true,
  coverageReporters: ['text-summary', 'html'],
};
