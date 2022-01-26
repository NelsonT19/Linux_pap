
const express = require('express')
const router = express.Router()

const usersModel = require('../models/usersModel')

router.post('/', (req, res) => {
    
    usersModel.find({'departamento':{$eq: req.body.departamento}})
    .exec()
    .then((result)=>{
        ShowDep = new usersModel({
            departamento: req.body.departamento
        })
        ShowDep.save()
        .then(result =>{
            
        })
    })

})






module.exports = router