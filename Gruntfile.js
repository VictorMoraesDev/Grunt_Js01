module.exports = function(grunt){


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: {
            dev: {
                files: {
                    'build/dev/styles/main.css': 'src/styles/*.less'
                }
            },
            dist: {
                options: {
                    compress: true
                },
                files: {
                    'build/dist/styles/main.min.css': 'src/styles/*.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:dev']
            },
            html:{
                files: ['src/index.html'],
                tasks: ['replace:dev']
            },
            js:{
                files:['src/scripts/**/*.js'],
                tasks: ['uglify:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDEREÇO DO CSS',
                            replacement: './styles/main.css' 
                        },
                        {
                            match: 'ENDEREÇO DO JS',
                            replacement: './scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expead: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'build/dev/index.html'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDEREÇO DO CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDEREÇO DO JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expend: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'build/dist/index.html'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html':'src/index.html'
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'build/dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            },
            dev: {
                options: {
                    compress: false,
                    beautify: true
                },
                files: {
                    'build/dev/scripts/main.js': 'src/scripts/main.js'
                }
            }


        
        },
        clean: ['prebuild']




    })


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');
    
    grunt.registerTask('default', ['less:dev', 'watch']);
    grunt.registerTask('build', ['less:dist', 'htmlmin:dist','replace:dist','uglify', 'clean'])


}