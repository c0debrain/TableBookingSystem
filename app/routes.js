

var Todo=require('./models/todo');

module.exports=function (app) {





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

    app.post('/api/todos/:todo_id',function (req,res) {

            Todo.create({_id:req.params.todo_id},function (err,todo) {
                if(err)
                    res.send(err);
                date=req.body.date;
                todo.time=req.body.name;
                todo.size=req.body.name;
                todo.phone=req.body.name;
                todo.name=req.body.name;

                //save the bear
                todo.save(function (err) {
                    if(err)
                        res.send(err);

                    res.json({message:'todo updated!'});
                });
            });



    });



// application -------------------------------------------

    app.get('*',function (req,res) {    // all other url is *
        res.sendfile('./public/template/index.html'); // load the single view file
    });



};









