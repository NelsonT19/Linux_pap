const express = require('express')
const inserirutilizadorRoute = express.Router()
const connection = require('../dbconnection')


inserirutilizadorRoute.post('/', (req,res) => {
    console.log(req.body)
   connection.query('INSERT INTO Utilizadores (idCards,idDepartment,Name,Morada_rua,Morada_numero,Datanascimento,Telemovel,Email) VALUES (?,?,?,?,?,?,?,?)', 
     [req.body.idCards,req.body.idDepartment,req.body.Name,req.body.Morada_rua, req.body.Morada_numero,req.body.Datanascimento,
        req.body.Telemovel,req.body.Email],     
     (err,result) => {
     if(err){
        console.log(err)
         return res.json({message: 'DB error'})
         
     }
     else {
         console.log(result)
         return res.json({message: 'User added to DB'})
     }
 })
 
})



module.exports = inserirutilizadorRoute