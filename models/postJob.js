const mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

var postJobSchema = new Schema({
    Work: { type:String,required:true},
    Location: { type:String,required:true},
    Salary: { type:Number,required:true},
    Category: { type:String,required:true}
});

module.exports = mongoose.model('postJob', postJobSchema);