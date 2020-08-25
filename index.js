const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
//require mongo atlas keys
//const connectDB = require('./DB/connection');

//requiring postjob model
var postJob = require('./models/postJob');
var jobing = postJob.find({});

const app = express();

//adding static files like css
app.use('/css',express.static('css'));

//connect to mongoDb atlas connection
//connectDB();

//connect to mongodb localhost connection
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/jobportal',{ useNewUrlParser: true}).then(() => console.log('connected')).catch((err)=>console.log('err'));

//ejs
app.set('view engine' , 'ejs');

//body-parser
app.use(express.urlencoded({ extended: false}));
var urlencodedParser = bodyParser.urlencoded({ extended: false});

//routes
app.get("/", function(req,res,next){
    jobing.exec(function(err,data){
        if(err) throw err;
        res.render('task',{records:data})
        console.log(data);
    });
});

app.get("/postJob", function(req,res){
    res.render("postJobForm")
});

app.get("/findJob", function(req,res){
    jobing.exec(function(err,data){
        if(err) throw err;
        res.render('serachJob',{records:data})
    });
});

app.get("/delete/:id", function(req,res){
    var id = req.params.id;
    var del = postJob.findByIdAndDelete(id);

    del.exec(function(err){
        if(err) throw err;
        res.redirect('/findJob');
    });
});

app.post('/postJob', urlencodedParser, (req,res) =>{
    const{Work,
        Location,
        Salary,
        Category } = req.body;
        
        const postJobUpdate = new postJob({
                            Work,
                             Location,
                             Salary,
                             Category
                        });
                console.log(postJobUpdate);
                //save user
                    postJobUpdate.save()
                    .then(user=>{
                       res.redirect('/');
                    })
                    .catch(err => console.log(err));
                
    });


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);
console.log('listening to magic port 5000');