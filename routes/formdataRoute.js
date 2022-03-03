
const express = require('express')
const router = express.Router()
const depModel = require('../models/depModel')

router.get('/', (req, res) => {
    depModel.find()
        .exec()
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.log(error)
        })
})



module.exports = router