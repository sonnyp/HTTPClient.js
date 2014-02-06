'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jsvalidate: {
      files:{
        src:[
          '*.js',
          'example/**/*.js',
          'lib/**/*.js',
          'test/**/*.js',
        ]
      }
    },

    jshint: {
      files:[
        '*.json',
        '*.js',
        'example/**/*.js',
        'lib/**/*.js',
        'test/**/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
        jshintignore: '.jshintignore'
      }
    },

    // mochaTest: {
    //   test: {
    //     options: {
    //       reporter: 'spec',
    //       ui: 'tdd'
    //     },
    //     src: ['test/**/*.js']
    //   }
    // }

    concat: {
      dist: {
        src: [
          'lib/browser.js',
          'index.js',
          'lib/utils.js'
        ],
        dest: 'HTTPClient.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'HTTPClient.min.js': ['HTTPClient.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // grunt.registerTask('mocha', ['mochaTest']);
  grunt.registerTask('syntax', ['jsvalidate', 'jshint']);
  grunt.registerTask('test', ['jsvalidate', 'jshint']);
  // grunt.registerTask('test', ['jsvalidate', 'mocha', 'jshint']);
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', 'test');
};