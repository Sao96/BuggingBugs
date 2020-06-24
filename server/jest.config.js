module.exports = {
    moduleDirectories: [
        ".",
        "<rootDir>/util/testing/dbTestController",
        "<rootDir>/util/testing",
        "node_modules",
        "src",
    ],
    moduleNameMapper: {
        models: "<rootDir>/models",
    },
    testEnvironment: "node",
};
