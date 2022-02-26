
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: './private/.env' })
const app = express()



mongoose.connect(process.env.MONGOURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to MongoDB"));


module.exports = mongoose;