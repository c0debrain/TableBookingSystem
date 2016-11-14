
var mongoose=require('mongoose');

module.exports=mongoose.model('Todo',{
    date:String,
    time:String,
    size:String,
    phone:String,
    name:String,
    code:String,
    table:String,
    done:Boolean
});













