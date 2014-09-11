'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files:[
        '*.json',
        '*.js',
        'example/**/*.js',
        'lib/**/*.js',
        'test/**/*.js',
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
        dest: 'dist/HTTPClient.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/HTTPClient.min.js': ['dist/HTTPClient.js']
        },
        options: {
          sourceMap: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('mocha', 'mochaTest');
  grunt.registerTask('syntax', 'jshint');
  grunt.registerTask('test', ['mocha', 'jshint']);
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', 'test');
};