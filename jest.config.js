module.exports = {
  "roots": [
    "<rootDir>/tests"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "collectCoverage": true,
  "coveragePathIgnorePatterns": ["/node_modules/", "/tests/"],
  "coverageReporters": ["text", "text-summary"],
  "reporters": ["default", "jest-junit"]
};
