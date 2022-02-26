
const express = require('express')
const router = express.Router()

const depModel = require('../models/depModel')

router.post('/', (req, res) => {
    console.log(req.body)
    depModel.find()
        .exec()
        .then((result) => {
            if (result == 0) {
                console.log('não existe')
                newDepart = new depModel({
                    departamentos: req.body.departamentos
                })
                newDepart.save()
                    .then(result => {
                        console.log('Departamento criados')
                        res.json({ msg: 'Departamento criados' })
                    })
                    .catch(error => {
                        console.log(error)
                        res.json({ msg: 'Ocorreu um erro' })
                    })
            }
            else {
                console.log('dep já criados')
                res.json({ msg: 'Os departamentos já estão criados' })
            }
        })
        .catch(error => {
            console.log(error)
        })
})



module.exports = router