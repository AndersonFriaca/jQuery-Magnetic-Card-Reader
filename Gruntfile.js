module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: './src',
      test: './test',
      dest: './dist'
    },
    pluginName: '<%= pkg.name.replace(/-/, ".") %>',
    license: grunt.file
      .read('LICENSE')
      .split('\n')
      .splice(3)
      .join('\n'),
    banner:
      '/*!\n' +
      ' * <%= pkg.description %> v<%= pkg.version %> ' +
      '(<%= pkg.homepage %>)\n' +
      ' * See all contribuitors in <%= pkg.repository.url %>' +
      'blob/master/CONTRIBUTORS.md\n\n' +
      ' * <%= pkg.license %> License\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      '<%= pkg.author.name %>\n' +
      ' * <%= license.replace(/\\n/gm, "\\n * ") %>\n' +
      ' */\n',
    clean: ['<%= dirs.dest %>'],
    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        'Gruntfile.js',
        '<%= dirs.src %>/**/*.js',
        '<%= dirs.test %>/unit/**/*.js'
      ]
    },
    uglify: {
      dev: {
        files: {
          '<%= dirs.dest %>/<%= pluginName %>.js': ['<%= dirs.src %>/**/*.js']
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
          '<%= dirs.dest %>/<%= pluginName %>.min.js': [
            '<%= dirs.src %>/**/*.js'
          ]
        },
        options: {
          report: 'min'
        }
      },
      options: {
        banner: '<%= banner %>'
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        singleRun: true,
        autoWatch: false
      }
    }
  });

  grunt.registerTask(
    'test:scenarios',
    'Define multiples scenarios for tests',
    function() {
      var karmaConfiguration = null;
      var scenariosConfiguration = require('./test/scenarios.json');
      var scenarios = Object.keys(scenariosConfiguration);
      var scenariosTasks = [];
      require('./karma.conf')({
        set: function(values) {
          karmaConfiguration = values;
        }
      });
      scenarios.forEach(function(scenario) {
        var scenarioFiles = scenariosConfiguration[scenario];
        var taskName = 'karma.scenario_' + scenario.replace(/[\._-]/g, '_');
        var generatedConfiguration = {
          logLevel: 'OFF'
          //reporters: "dots"
        };
        if (Array.isArray(scenarioFiles)) {
          generatedConfiguration.options = {
            files: scenarioFiles.concat(karmaConfiguration.files || [])
          };
        } else {
          generatedConfiguration.configFile = scenarioFiles;
        }
        grunt.config.set(taskName, generatedConfiguration);
        scenariosTasks.push(taskName.replace(/\./, ':'));
      });
      grunt.task.run(scenariosTasks);
    }
  );

  grunt.registerTask('test', ['jshint', 'test:scenarios']);
  grunt.registerTask('build', ['jshint', 'clean', 'uglify']);
  grunt.registerTask('default', ['test']);
};
