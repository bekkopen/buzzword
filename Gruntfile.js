module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
    },
    jshint: {
      all: ['Gruntfile.js', 'app.js', 'views/**/*.js', 'public/javascripts/**/*.js', '!public/javascripts/component/**', 'routes/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'uglify']);
  
};