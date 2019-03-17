module.exports = function(grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    dirs: {
      src: "./src",
      test: "./test",
      dest: "./dist"
    },
    pluginName: "<%= pkg.name %>",
    license: grunt.file
      .read("LICENSE")
      .split("\n")
      .splice(3)
      .join("\n"),
    banner:
      "/*!\n" +
      " * <%= pkg.description %> v<%= pkg.version %> " +
      "(<%= pkg.homepage %>)\n" +
      " * See all contribuitors in <%= pkg.repository.url %>CONTRIBUTORS.md\n\n" +
      " * <%= pkg.license %> License\n" +
      " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> " +
      "<%= pkg.author.name %>\n" +
      " * <%= license.replace(/\\n/gm, \"\\n * \") %>\n" +
      " */\n",
    clean: ["<%= dirs.dest %>"],
    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        "Gruntfile.js",
        "<%= dirs.src %>/**/*.js",
        "<%= dirs.test %>/**/*.js"
      ]
    },
    uglify: {
      dev: {
        files: {
          "<%= dirs.dest %>/<%= pluginName %>.js": ["<%= dirs.src %>/**/*.js"]
        },
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          preserveComments: false
        }
      },
      min: {
        files: {
          "<%= dirs.dest %>/<%= pluginName %>.min.js": [
            "<%= dirs.src %>/**/*.js"
          ]
        },
        options: {
          report: "min"
        }
      },
      options: {
        banner: "<%= banner %>"
      }
    }
  });

  grunt.registerTask("test", ["jshint"]);
  grunt.registerTask("build", ["jshint", "uglify"]);
  grunt.registerTask("default", ["test"]);
};
