const express = require('express')
const router = express.Router()

const tableusers = require('../models/usersModel')

router.get('/', (req, res) => {

    tableusers.find({})
        .exec()
        .then((users) => {

            if (users == 0) {
                res.json({ msg: 'Nenhum utilizador encontrado' })
            }
            else {
                res.json(users)
            }
        }).catch(error => {
            console.log(error)
        })
})



module.exports = router