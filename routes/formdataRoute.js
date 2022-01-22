const express = require('express')
const formdataRoute = express.Router()
const connection = require('../dbconnection')


formdataRoute.get('/',(req,res) =>{

    connection.query("SELECT * FROM Department ",(err,result) =>{
        if(err){
            console.log(err)
            console.log('Erro na BD...')
        }else{
            res.json(result)
        }

   })
    
})


module.exports = formdataRoute