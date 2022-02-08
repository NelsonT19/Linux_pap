
const express = require('express')
const router = express.Router()

const historico = require('../models/historicoModel')

router.post('/', (req, res) => {
    historico.find({'idCard':{$eq:req.body.idCard}})
    .exec()
    .then((result)=>{
        if(result == 0){
            console.log('cartão não existe...')
        }else{
          
        }
    })

})

module.exports = router