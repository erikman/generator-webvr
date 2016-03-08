module.exports = function(grunt) {
  // Load dev dependencies
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take for build time optimizations
  require('time-grunt')(grunt);

  // Configure the app path
  var base = 'app';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [ base, 'node_modules']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [ base + '/js/*.js' ]
    },
    jsonlint: {
      pkg: [ 'package.json' ]
    },
    watch: {
      // Watch javascript files for linting
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint']
      },
      json: {
        files: [
          'package.json',
          '.jshintrc'
        ],
        tasks: ['jsonlint']
      },
      // Live reload
      reload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= watch.js.files %>',
          '<%= watch.json.files %>',
          base + '/css/**/*.css',
          '**/*.html'
        ]
      }
    }
  });

  grunt.registerTask('serve', function () {
    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('lint', ['jsonlint', 'jshint']);

  grunt.registerTask('default', ['serve']);
};
