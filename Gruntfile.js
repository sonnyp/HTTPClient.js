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

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          ui: 'tdd'
        },
        src: ['test/**/*.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('mocha', ['mochaTest']);
  grunt.registerTask('syntax', ['jsvalidate', 'jshint']);
  grunt.registerTask('test', ['jsvalidate', 'mocha', 'jshint']);
  grunt.registerTask('default', 'test');
};