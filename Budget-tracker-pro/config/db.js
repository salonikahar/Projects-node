    let mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/budgetTraker');

    const db = mongoose.connection;

    db.once('open' , (err)=>{
        if(err){
            console.log(err)
            return false;
        }
        console.log("db is connect");
    })

    module.exports = db;
    // mongodb://localhost:27017