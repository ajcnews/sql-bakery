/*
 * grunt-sql-bakery
 * 
 *
 * Copyright (c) 2015 Ashlyn Still
 * Licensed under the MIT license.
 */
var Promise  = require('bluebird'),
    _ = require('underscore');

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // var Database = f.Database;
    
  var DEFAULTS = {
    host: '',
    database: '',
    user: '',
    password: '',
    tables: [],
    output_path: ''
  };

  grunt.registerMultiTask('sql_bakery', 'Bakes out json from sql', function () {
    
    //get options
    var options = this.options(DEFAULTS);
    var async = grunt.util.async;
    var done = this.async(); 

    grunt.log.writeln(options.database);

    // In a file named something like db.js
    var knex = require('knex')({
      client: 'mysql',
      connection: {
        host: options.host,
        database: options.database,
        user: options.user,
        password: options.password,
        charset  : 'utf8'
      }
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
         } else {
           grunt.log.writeln('Configured >> '+o);
         }
     });
   };

    checkCredentials(options);

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
      var count = 1;
      collection.fetch().then(function(collection) {
          output = JSON.stringify(collection, null, 4);
          grunt.file.write(options.output_path+'/'+t+'.json', output, 'utf-8');
          count++;
      }).then(function(){
        if (i===0){
          done();
        }
      });

    });
    

  });

};
