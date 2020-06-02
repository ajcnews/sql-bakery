/*
 * sql-bakery
 *
 *
 * Copyright (c) 2015 Ashlyn Still
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    sql: grunt.file.readJSON('config/sql.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    sql_bakery: {
      db: {
        options: {
          client: '<%= sql.client %>',
          tables: '<%= sql.tables %>',
          output_path: '<%= sql.output_path %>',
          charset: '<%= sql.charset %>',
          connection: {
            host: '<%= sql.host %>',
            database: '<%= sql.db %>',
            user: '<%= sql.user %>',
            password: '<%= sql.pw %>',
          }
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sql_bakery']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
