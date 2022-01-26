
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: './private/.env' })
const app = express()



mongoose.connect(process.env.MONGOURI, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to MongoDB"));









































/*const mysql = require('mysql2');
const express = require('express')

require('dotenv').config({path: './private/.env'})


const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    port:process.env.DATABASE_PORT,
    database: process.env.DATABASE
 
 });

 connection.connect( (err) =>{
    if(err){

        console.log(err)
        
    }else{
        console.log("MYSQL CONNECTED...")
    }
 })

 

module.exports = connection*/