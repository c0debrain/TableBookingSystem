/**
 * Created by charles on 11/16/16.
 */


module.exports=function (grunt) {

    grunt.initConfig({

        // js Tasks ===========================
        // check all js files for errors

        jshint:{
            all:['app/*.js','app/models/*.js','config/*.js','public/**/*.js']
        },
        uglify:{
            build:{
                files:{
                    'dist/js/app.min.js':['public/common/controller.js','public/core/main.js']
                }
            }
        },

        // css Tasks ===================================
        // process the less file to style.css





        // run watch and nodemon at the same time

        // concurrent:{
        //     options:{
        //         logConcurrentOutput:true
        //     },
        //     tasks:['nodemon','watch']
        //
        // },


        //configure nodemon

        nodemon:{
            dev:{
                script:'server.js'
            }
        }

        // Cool Tasks =============================================

        // watch js and css files a nd process the above tasks


        // watch:{
        //     css:{
        //         files:['./src/css/*.less'],
        //         tasks:['less','cssmin']
        //
        //     },
        //     js:{
        //         files:['./src/js/**/*.js'],
        //         tasks:['jshint','uglify']
        //     }
        // }





    });

    // load all necesssary dependecies
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    // grunt.loadNpmTasks('grunt-concurrent');

    // register teh nodemon task when we run grunt

    grunt.registerTask('default',['jshint','uglify','nodemon']);



};




