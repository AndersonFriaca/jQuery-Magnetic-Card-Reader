var tests = [];

for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\.(spec|test)\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
  baseUrl: "/base",
  paths: {
    jquery: "test/vendor/jquery/dist/jquery.min",
    "jquery.magnetic-card-reader": "src/jquery.magnetic-card-reader"
  },
  shim: {
    jquery: {
      exports: "$"
    },
    "jquery.magnetic-card-reader": {
      deps: ["jquery"]
    }
  },

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
