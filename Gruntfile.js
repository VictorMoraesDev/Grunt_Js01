module.exports = function(grunt){


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: {
            dev: {
                files: {
                    'build/dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
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
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css' 
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '/scripts/main.min.js'
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
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }



    })


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');
    
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist','replace:dist','uglify', 'clean'])


}