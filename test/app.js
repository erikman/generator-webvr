'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-webvr:app', function () {
  before(function (done) {
    var deps = [
      [helpers.createDummyGenerator(), 'node:app']
    ];
    helpers.run(path.join(__dirname, '../generators/app'))
      .withGenerators(deps)
      .withPrompts({license: 'MIT'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'Gruntfile.js',
      '.jshintrc',
      '.gitignore',
      'package.json',
      'app/index.html',
      'app/js/main.js',
      'app/css/main.css'
    ]);
  });
});
