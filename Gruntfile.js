'use strict';

module.exports = function(grunt) {

        // Project configuration.
        grunt.initConfig({
            // Metadata.
            pkg: grunt.file.readJSON('package.json'),
            banner: grunt.file.read('banner.js.tmpl'),
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/<%= pkg.name %>.js'],
                dest: 'dist/jquery.<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                report: 'gzip'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>.min.js'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            }
        },
        cssmin: {
            minify: {
                options: {
                    banner: '<%= banner %>',
                    report : 'gzip'
                },
                files : {
                    'css/jquery.<%= pkg.name %>.min.css': ['css/jquery.<%= pkg.name %>.css']
                }
            }
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task.
    // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']); // ...someday
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);

};
