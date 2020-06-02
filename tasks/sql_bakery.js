/*
 * grunt-sql-bakery
 *
 *
 * Copyright (c) 2015 Ashlyn Still
 * Licensed under the MIT license.
 */
var _ = require('underscore');

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var DEFAULTS = {
    client: 'mysql',
    tables: [],
    output_path: './data',
    connection: {},
    charset: 'utf8'
  };

  grunt.registerMultiTask('sql_bakery', 'Bakes out json from sql', function () {
    var options = this.options(DEFAULTS); // FIXME: this does not actually merge defaults. But we do fallback to the defaults in checkCredentials() if an option is not set
    var done = this.async();

    checkCredentials(options);

    var knex = require('knex')({
      client: options.client,
      connection: options.connection
    });
    var bookshelf = require('bookshelf')(knex);


    // check for data directory, if doesn't exit, create
    if (!grunt.file.isDir(options.output_path)) {
      grunt.file.mkdir(options.output_path)
    }

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

      collection.fetch( {require: true} ).then(function(collection) { //require: true -- returning an empty table triggers an error
        grunt.log.writeln("Fetched table '" + t + "': " + collection.length + " records");
        output = JSON.stringify(collection, null, 4);
        grunt.file.write(options.output_path+'/'+t+'.json', output, 'utf-8');
        count++;
      }).catch(function(err){
        grunt.fail.warn(err)
      }).finally(function() {
        return bookshelf.knex.destroy(); //destroy DB connection pool so script will exit
      });

    });

  });

  function checkCredentials(options){ //checks to make sure db config is all set
    _.allKeys(options).forEach(function(o,i){
       if(!options[o] || (o==='tables' && options[o].length<1)){
         grunt.log.warn("No '"+o+"' specified! Using default: "+DEFAULTS[o]);
         options[o] = DEFAULTS[o];
       }
    });
  }
};
