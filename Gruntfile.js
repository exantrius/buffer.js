module.exports = function (grunt) {
    "use strict";

    var src_files = [
        'wrappers/intro_wrapper.js',
        'lib/buffer.js',
        'wrappers/outro_wrapper.js'
    ];

    grunt.initConfig({
        //Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
                ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',

        clean: {
            dist: ["dist"]
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src:  src_files,
                dest: 'dist/<%= pkg.name %>'
            }
        },

        jshint: {
            options: {
                curly:   true,
                eqeqeq:  true,
                immed:   true,
                latedef: true,
                newcap:  true,
                noarg:   true,
                sub:     true,
                undef:   true,
                unused:  true,
                boss:    true,
                eqnull:  true,
                browser: true,
                
                //reporter: jshint_stylish_ex,

                globals: {
                    console:        true,
                    document:       true,
                    window:         true,
                    escape:         true,
                    unescape:       true,
                    debuglogClient: true,
                    describe:       true,
                    it:             true,
                    expect:         true
                }
            },
            lib: {
                src: [
                    'lib/*.js'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [ 
        'clean', 'jshint', 'concat'
    ]);


};