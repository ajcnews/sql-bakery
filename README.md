# sql-bakery

> Bakes out json from sql


## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:


```shell
npm install sql-bakery --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('sql-bakery');
```

## The "sql_bakery" task

### Overview
In your project's Gruntfile, add a section named `sql_bakery` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sql: grunt.file.readJSON('config/sql.json'),
  sql_bakery: {
    options: {
      host: '<%= sql.host %>',
      database: '<%= sql.db %>',
      user: '<%= sql.user %>',
      password: '<%= sql.pw %>',
      tables: '<%= sql.tables %>',
      output_path: 'path_to_where_data_folder_will_be_created'
    }
  },
})
```

### Options

All of the options passed in will be pulled from the `config/sql.json` file, where your database credentials are stored. This config file should be included in your `.gitignore` so you don't publish your db credentials. There's an example of what this file should look like in the config folder called `sql.json.example`.



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Ashlyn Still. Licensed under the MIT license.
