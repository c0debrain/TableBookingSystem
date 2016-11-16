
// set up ==============================================
var express=require('express');
var app=express();      // create app with express
var router=express.Router();
var mongoose=require('mongoose');   // mongoose for mongoDB
var port     = process.env.PORT || 8080;
var morgan=require('morgan');  // log requests to the console
var bodyParser=require('body-parser');  // pull information from HTML POST
var methodOverride=require('method-override'); // simulate DELETE and PUT
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');



// configuration ================================================
var database=require('./config/database');

mongoose.connect(database.url);
require('./config/passport')(passport); // pass passport for configuration



// set up for express application

app.use(express.static(__dirname+'/public')); // set the static files location
app.use(morgan('dev'));   // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));  // parse application with x-www-form-urlencoded
app.use(bodyParser.json());  // parse application with json
app.use(bodyParser.json({type:'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(cookieParser()); // read cookies (needed for auth)

// set up for ejs
app.set('view engine', 'ejs'); // set up ejs for templating


// set up for  for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes =====================================

require('./app/routes')(app,passport);

// listen to certain port , Launch======================
app.listen(port);
console.log("app listening on port "+ port);





