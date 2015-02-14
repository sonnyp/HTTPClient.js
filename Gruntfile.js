'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      files: [
        '*.js',
        'example/**/*.js',
        'lib/**/*.js',
        // 'test/**/*.js',
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          ui: 'tdd'
        },
        src: ['test/**/*.js']
      }
    },

    concat: {
      dist: {
        src: [
          'lib/utils.js',
          'lib/Response.js',
          'lib/Request.js',
          'lib/browser.js',
          'lib/index.js',
        ],
        dest: 'HTTPClient.js'
      }
    },

  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('mocha', ['mochaTest']);
  grunt.registerTask('syntax', ['eslint']);
  grunt.registerTask('test', ['mocha', 'syntax']);
  grunt.registerTask('build', ['concat']);
  grunt.registerTask('default', ['test']);
};
