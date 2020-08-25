const mongoose = require('mongoose');

const URI = ('mongodb+srv://dbUser:dbUser@cluster0.f9ylo.mongodb.net/<dbname>?retryWrites=true&w=majority');


const connectDB = async() =>{
    await mongoose.connect(URI,
        { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Atlas connected with stc task");
}

module.exports = connectDB;