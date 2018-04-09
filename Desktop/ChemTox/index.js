require("dotenv").config()
const express = require("express")
const {json} = require("body-parser")
//es6 destructor, give me this part
const cors = require("cors")
const massive = require("massive")
const passport = require("passport")
const auth0strategy = require("passport-auth0")
const mysql = require("mysql")
const port = 5000

const app = express()

app.use(json());
const{
    HOST,
    USER,
    DATABASE
} = process.env;

//massive(CONNECTION_STRING).then(db=>app.set('db',db)).catch(err=>console.log(err));
var connection = mysql.createConnection({
    host:HOST,
    user:USER,
    database:DATABASE
});

connection.connect()
require('./routes/routes')(app,connection);//dollychaining
connection.query("SELECT * FROM assay",function (error,results,fields){
    console.log(results[0]);
})

app.listen(port, ()=> {
    console.log(`Listening on Port: ${port}`);
});