
const express = require('express')
const router = express.Router()

const usersModel = require('../models/usersModel')

router.post('/', (req, res) => {
    console.log(req.body)
    usersModel.find({'idCard':{$eq: req.body.idCard}})
    .exec()
    .then((result)=>{
        if(result == 0){
            newCard = new usersModel({
               idCard: req.body.idCard,
               nome: req.body.nome,
               morada_rua: req.body.morada_rua,
               morada_num: req.body.morada_num,
               datanascimento: req.body.datanascimento,
               email: req.body.email,
               telemovel: req.body.telemovel,
               departamento: req.body.departamento,
               estado: 'Ausente'
            })
            newCard.save()
            .then(result => {
                res.json({msg: 'Cartão criado'})
                
            })
            .catch(error => {
                res.json({msg: 'Ocorreu um erro'})
                

            })
        }
        else {
            
            res.json({msg:'Cartão existente'})
            
            
        }
    })
    .catch(error =>{
        console.log(error)

    })
})

module.exports = router