// Karma configuration for RequireJS integration
module.exports = function(config) {
  config.set({
    basePath: "../../",
    frameworks: ["requirejs", "qunit"],
    files: [
      {
        pattern: "test/vendor/jquery/dist/jquery.min.js",
        included: false
      },
      {
        pattern: "src/**/*.js",
        included: false
      },
      "test/integration/*.config.js",
      "test/integration/*.test.js"
    ],
    preprocessors: {
      "src/**/*.js": "coverage"
    },
    exclude: ["karma.conf.js"],
    reporters: ["dots", "coverage"],
    coverageReporter: {
      type: "lcov",
      dir: "test/coverages/requirejs"
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["PhantomJS"],
    autoWatch: false,
    singleRun: true
  });
};
