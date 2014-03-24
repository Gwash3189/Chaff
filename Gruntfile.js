module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'dist/src/Chaff/Chaff.min.js': ['dist/**/*.js']
                }
            }
        },
        typescript: {
            production: {
                src: ["src/Chaff/**/*.ts"],
                dest: "dist",
                options: {
                    declaration: true
                },
                basepath: 'src/Chaff'
            },
            tests: {
                src: ["src/tests/**/*.ts"],
                dest: "src/tests/tests.js"
            }
        },
        watch: {
            prod: {
                files: ['src/Chaff/**/*.ts'],
                tasks: ['typescript:production', 'uglify'],
                options: {
                    spawn: false
                }
            },
            tests: {
                files: ['src/tests/**/*.ts'],
                tasks: ['typescript:tests'],
                options: {
                    spawn: false
                }
            }
        }
    });


    grunt.registerTask("default", ['typescript']);
}