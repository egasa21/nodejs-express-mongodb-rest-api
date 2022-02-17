const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const db = require('./app/models');


db.mongoose
    .connect(db.url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=> console.log('Connected to the database'))
    .catch((err)=>{
        console.log('Cannot connect to the database ', err);
        process.exit();
    })

var corsOption = {
    origin: "http://localhost:8081"
}


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send({message: "Server is online"});
})
require('./app/routes/tutorial.routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log('Running on http://localhost:8080');
})