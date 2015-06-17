// var f = require('firenze'),
//     MysqlAdapter = require('firenze-adapter-mysql'),
//     fs = require('fs'),
//     _ = require('underscore');


// var Database = f.Database;

// 'use strict';

// module.exports = function (grunt) {

// 	var DEFAULTS = {
// 		host: '',
// 		database: '',
// 		user: '',
// 		password: '',
// 		tables: []
// 	};

// 	grunt.registerMultiTask('connect', 'connects to database', function () {

// 		var options = this.options(DEFAULTS);

// 		function checkCredentials(options){ //checks to make sure db config is all set
// 			_.allKeys(options).forEach(function(o,i){
// 			    if(!options[o] || (o==='tables' && options[o].length<1)){
// 			      grunt.fail.warn("No '"+o+"' specified!");
// 			    } else {
// 			      grunt.log.writeln('Configured >> '+o+': '+options[o]);
// 			    }
// 			});
// 		};

// 		checkCredentials(options);

// 		var db = new Database({
// 		  adapter: MysqlAdapter,
// 		  host: options.host,
// 		  database: options.db,
// 		  user: options.user,
// 		  password: options.pw,
// 		});

// 		var Model, Collection;

// 		var writeJson = function(table){
// 			Model = f.createModelClass({
// 			  collectionClass: Collection
// 			});

// 			Collection = f.createCollectionClass({
// 			  db: db, // instance of your Database
// 			  table: table,
// 			  modelClass: Model
// 			});

// 			var collection = new Collection();

// 			var output = [];

// 			collection.findAll().then(function(model){
// 				model.forEach(function(m){
// 					console.log(m.attributes);
// 				});
// 			});
// 		}

// 		var tables = options.tables;

// 		tables.forEach(function(t){ 
// 			writeJson(t);
// 		});
// 	});

// }
