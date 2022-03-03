const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


router.get('/user/login', (req, res) => {
    res.render('login')
})


router.get('/dashboard', (req, res) => {
    res.render('index')
})

module.exports = router;