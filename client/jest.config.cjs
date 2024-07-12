module.exports = {
  rootDir: ".",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/src/tests/**/*.(test|spec).(js|jsx)"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$":
      "<rootDir>/src/tests/__mocks__/fileMock.js",
  },
};
