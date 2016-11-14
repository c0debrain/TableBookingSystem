/**
 * Created by charles on 11/11/16.
 */

var Todo=require('./models/todo');



module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    // app.get('/', function(req, res) {
    //     res.render('index.ejs'); // load the index.ejs file
    // });

    // =====================================
    // LOGIN ===============================
    // =====================================

    app.use(function timeLog(req,res,next){
       console.log('Time: ',Date.now());
        next();
    });

    // show the login form

    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

// process the signup form
// app.post('/signup', do all our passport stuff here);

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)

    app.get('/profile', isLoggedIn, function (req, res) {
        // res.render('profile.ejs');
        res.sendfile('./public/template/profile.html');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true // allow flash message
    }));


// route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    // api ----------------------------------------------------------------------------
// get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(todos); // return all todos in JSON format
        });
    });

// create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            date:req.body.date,
            time:req.body.time,
            size:req.body.size,
            phone:req.body.phone,
            name:req.body.name,
            code:req.body.code,
            table:req.body.table,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });

    });
    // update a todo

    app.put('/api/todos/:todo_id',function (req,res) {
        Todo.findOneAndUpdate({_id: req.params.todo_id},
            {
                date: req.body.date,
                time: req.body.time,
                size: req.body.size,
                phone: req.body.phone,
                name: req.body.name,
                code:req.body.code,
                table:req.body.table
            }, function (err, todo) {

                if (err)
                    res.send(err);
                Todo.find(function (err, todos) {
                    if (err)
                        res.send(err);
                    res.json(todos);
                });
            })


    });


    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });
    });





// application -------------------------------------------

    app.get('*',function (req,res) {    // all other url is *
        res.sendfile('./public/template/index.html'); // load the single view file
    });





};




























//
//
//
//
//
//
// /**
//  * Created by charles on 11/11/16.
//  */
//
// var Todo=require('./models/todo');
//
//
//
// module.exports = function(app, passport) {
//
//     // =====================================
//     // HOME PAGE (with login links) ========
//     // =====================================
//     // app.get('/', function(req, res) {
//     //     res.render('index.ejs'); // load the index.ejs file
//     // });
//
//     // =====================================
//     // LOGIN ===============================
//     // =====================================
//     // show the login form
//
//     app.get('/login', function (req, res) {
//
//         // render the page and pass in any flash data if it exists
//         res.render('login.ejs', {message: req.flash('loginMessage')});
//     });
//     // process the login form
//     // app.post('/login', do all our passport stuff here);
//
//     // =====================================
//     // SIGNUP ==============================
//     // =====================================
//     // show the signup form
//     app.get('/signup', function (req, res) {
//
//         // render the page and pass in any flash data if it exists
//         res.render('signup.ejs', {message: req.flash('signupMessage')});
//     });
//
// // process the signup form
// // app.post('/signup', do all our passport stuff here);
//
// // =====================================
// // PROFILE SECTION =====================
// // =====================================
// // we will want this protected so you have to be logged in to visit
// // we will use route middleware to verify this (the isLoggedIn function)
//
//     app.get('/profile', isLoggedIn, function (req, res) {
//         // res.render('profile.ejs');
//         res.sendfile('./public/template/profile.html');
//     });
//
//     // =====================================
//     // LOGOUT ==============================
//     // =====================================
//     app.get('/logout', function (req, res) {
//         req.logout();
//         res.redirect('/');
//     });
//
//
//     // process the signup form
//     app.post('/signup', passport.authenticate('local-signup', {
//         successRedirect: '/profile',
//         failureRedirect: '/signup',
//         failureFlash: true
//     }));
//
//     app.post('/login', passport.authenticate('local-login', {
//         successRedirect: '/profile',
//         failureRedirect: '/login',
//         failureFlash: true // allow flash message
//     }));
//
//
// // route middleware to make sure a user is logged in
//     function isLoggedIn(req, res, next) {
//
//         // if user is authenticated in the session, carry on
//         if (req.isAuthenticated())
//             return next();
//
//         // if they aren't redirect them to the home page
//         res.redirect('/');
//     }
//
//     // api ----------------------------------------------------------------------------
// // get all todos
//     app.get('/api/todos', function(req, res) {
//
//         // use mongoose to get all todos in the database
//         Todo.find(function(err, todos) {
//
//             // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err);
//
//             res.json(todos); // return all todos in JSON format
//         });
//     });
//
// // create todo and send back all todos after creation
//     app.post('/api/todos', function(req, res) {
//
//         // create a todo, information comes from AJAX request from Angular
//         Todo.create({
//             date:req.body.date,
//             time:req.body.time,
//             size:req.body.size,
//             phone:req.body.phone,
//             name:req.body.name,
//             done : false
//         }, function(err, todo) {
//             if (err)
//                 res.send(err);
//
//             // get and return all the todos after you create another
//             Todo.find(function(err, todos) {
//                 if (err)
//                     res.send(err);
//                 res.json(todos);
//             });
//         });
//
//     });
//     // update a todo
//     app.put()
//
//     // delete a todo
//     app.delete('/api/todos/:todo_id', function(req, res) {
//         Todo.remove({
//             _id : req.params.todo_id
//         }, function(err, todo) {
//             if (err)
//                 res.send(err);
//
//             // get and return all the todos after you create another
//             Todo.find(function(err, todos) {
//                 if (err)
//                     res.send(err);
//                 res.json(todos);
//             });
//         });
//     });
//
//     app.post('/api/todos/:todo_id',function (req,res) {
//
//         Todo.create({_id:req.params.todo_id},function (err,todo) {
//             if(err)
//                 res.send(err);
//             date=req.body.date;
//             todo.time=req.body.name;
//             todo.size=req.body.name;
//             todo.phone=req.body.name;
//             todo.name=req.body.name;
//
//             //save the bear
//             todo.save(function (err) {
//                 if(err)
//                     res.send(err);
//
//                 res.json({message:'todo updated!'});
//             });
//         });
//
//
//
//     });
//
//
//
// // application -------------------------------------------
//
//     app.get('*',function (req,res) {    // all other url is *
//         res.sendfile('./public/template/index.html'); // load the single view file
//     });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// };
//
//














































