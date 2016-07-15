/*
 * grunt-sql-bakery
 *
 *
 * Copyright (c) 2015 Ashlyn Still
 * Licensed under the MIT license.
 */
var Promise  = require('bluebird'),
    _ = require('underscore'),
    mysql = require('mysql');

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // var Database = f.Database;

  var DEFAULTS = {
    client: '',
    tables: [],
    output_path: '',
    connextion: {}
  };

  grunt.registerMultiTask('sql_bakery', 'Bakes out json from sql', function () {

    //get options
    var options = this.options(DEFAULTS);
    var async = grunt.util.async;
    var done = this.async();

    grunt.log.writeln(options.database);

    // In a file named something like db.js
    options.connection.charset = options.connection.charset || 'utf8';
    var knex = require('knex')({
      client: options.client,
      connection: options.connection
    });

    var bookshelf = require('bookshelf')(knex);


    // check for data directory, if doesn't exit, create
    if (!grunt.file.isDir(options.output_path)) {
      grunt.file.mkdir(options.output_path)
    }

    function checkCredentials(options){ //checks to make sure db config is all set
     _.allKeys(options).forEach(function(o,i){
         if(!options[o] || (o==='tables' && options[o].length<1)){
           grunt.fail.warn("No '"+o+"' specified!");
         }
     });
   };

    checkCredentials(options);

    var count = 0;
    var tables = options.tables,
      Model, Collection, collection, output;


    tables.forEach(function(t,i){
      Model = bookshelf.Model.extend({
        tableName: t
      });

      Collection = bookshelf.Collection.extend({
        model: Model
      });

      var collection = new Collection();

      collection.fetch().then(function(collection) {
          output = JSON.stringify(collection, null, 4);
          grunt.file.write(options.output_path+'/'+t+'.json', output, 'utf-8');
          count++;
      }).then(function(){
        if (count===tables.length){
          done();
        }
      });

    });

  });

};
