/*
 * grunt-sql-bakery
 * 
 *
 * Copyright (c) 2015 Ashlyn Still
 * Licensed under the MIT license.
 */
var Promise  = require('bluebird'),
    _ = require('underscore');

// 'use strict';

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
    var done = this.async(); 
    var options = this.options(DEFAULTS);

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

    var Model = bookshelf.Model.extend({
       tableName: 'use_of_force'
    });

    var Collection = bookshelf.Collection.extend({
      model: Model
    });

    var collection = new Collection();

    collection.fetch().then(function(collection) {
        var json = JSON.stringify(collection);
        grunt.log.writeln(json);
    });

    

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

    // var db = new Database({
    //   adapter: MysqlAdapter,
    //   host: options.host,
    //   database: options.db,
    //   user: options.user,
    //   password: options.pw
    // });



    // var Model, Collection;

    // var sequence = Promise.resolve();

    // var getJson = function(table){
    //   Model = f.createModelClass({
    //     collectionClass: Collection
    //   });

    //   Collection = f.createCollectionClass({
    //     db: db, // instance of your Database
    //     table: table,
    //     modelClass: Model
    //   });

    //   var collection = new Collection();
    //   return collection.findAll();
    //   // fs.writeFile(options.output_path+'/'+table+'.json', JSON.stringify(output, null, 4), 'utf-8');


    // }

    // var tables = options.tables;

    // tables.forEach(function(t){ 
    //   getJson(t).then(function(collection) {
    //     grunt.log.ok("Success!");
    //     var output=[];
    //     collection.forEach(function(m){
    //       output.push(m.attributes);
    //     });
    //     fs.writeFile(options.output_path+'/'+t+'.json', JSON.stringify(output, null, 4), 'utf-8');
    //     done();
    //   });
    // });

    

  });

};
