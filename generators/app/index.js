'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var extend = require('deep-extend');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sublime ' + chalk.red('generator-webvr') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your application name',
      default: path.basename(process.cwd())
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  defaults: function () {
    this.composeWith('node:app', {
      options: {
        babel: false,
        boilerplate: false,
        gulp: false,
        coveralls: false,
        name: this.props.name,
        projectRoot: 'app',
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require('generator-node').app
    });
  },

  writing: {
    pkg: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      extend(pkg, {
        dependencies: {
          'webvr-boilerplate': '^0.3.7'
        },
        devDependencies: {
          'grunt': '^0.4.5',
          'grunt-contrib-jshint': '^0.10.0',
          'grunt-contrib-connect': '^0.8.0',
          'grunt-contrib-watch': '^0.6.1',
          'grunt-jsonlint': '^1.0.4',
          'grunt-newer': '^1.1.0',
          'load-grunt-tasks': '^3.1.0',
          'time-grunt': '^1.0.0'
        }
      });

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },
    gruntfile: function () {
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js'));
    },
    dotfiles: function () {
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc'));
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));
    },
    app: function () {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        this.props);
      this.fs.copyTpl(
        this.templatePath('main.js'),
        this.destinationPath('app/js/main.js'),
        this.props);
      this.fs.copy(
        this.templatePath('main.css'),
        this.destinationPath('app/css/main.css'),
        this.props);
    }
  },

  install: function () {
    this.npmInstall();
  }
});
