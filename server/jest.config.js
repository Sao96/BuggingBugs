module.exports = {
    moduleDirectories: [
        ".",
        "node_modules",
        "<rootDir>/util/testing/dbTestController",
        "src",
    ],
    moduleNameMapper: {
        models: "<rootDir>/models",
    },
    testEnvironment: "node",
};
