/**
 * Created by charles on 11/11/16.
 */


var mongoose=require('mongoose');

var bcrypt=require('bcrypt-nodejs');


// define the schema for our model

var managerSchema=mongoose.Schema({

    local: {
        email: String,
        password: String

    }

});


// method =============
// generating a hash

managerSchema.methods.generateHash=function (password) {

    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

//checking if password is valid

managerSchema.method.validPassword=function (password) {
    return bcrypt.compareSync(password,this.local.password);
};

module.exports=mongoose.model('User',managerSchema);


