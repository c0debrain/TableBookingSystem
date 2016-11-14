/**
 * Created by charles on 11/11/16.
 */




var localStrategy=require('passport-local').Strategy;

var User=require('../app/models/manager');

module.exports=function (passport) {
    // passport session setup, required for persistent login sessions
    // passport needs ability to serialize and unserialize user out of session

    //used to serialize the user for the session

    passport.serializeUser(function (user,done) {
        done(null, user.id);
    });

    // used to deserialize the user

    passport.deserializeUser(function (id,done) {
        User.findById(id,function (err,user) {
            done(err,user);
        });
    });

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup',new localStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        },
        function (req,email,password,done) {
            // User.findOne won't fire unless data is sent back
            process.nextTick(function () {
                User.findOne({'local.email':email},function (err,user) {
                    if(err)
                        return done(err);

                    if(user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken'));
                    }else{
                        // if there is no user with that email

                        var newUser=new User();

                        //set the user's local credentials

                        newUser.local.email=email;
                        newUser.local.password=newUser.generateHash(password);

                        newUser.save(function (err) {
                            if(err)
                                throw err;
                            return done(null,newUser);
                        });

                    }
                });

            });

        }));

    passport.use('local-login',new localStrategy({

            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to callback

        },
        function (req,email,password,done) {

            User.findOne({'local.email':email},function (err,user) {
                if(err)
                    return done(err);
                if(!user)
                    return done(null,false,req.flash('loginMessage','No user found')); // req.flash is the way to set flashdata using connect-flash

                // if(!user.validPassword(password))
                //     return done(null, false, req.flash('loginMessage','Oops! Wrong password')); // set up flashdata and save it to session


                    return done(null,user);


            });




        }));





};


