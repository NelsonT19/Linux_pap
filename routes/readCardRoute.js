
const express = require('express')
const router = express.Router()
const usersModel = require('../models/usersModel')

router.put('/', (req, res) => {
   console.log(req)
   usersModel.findOne({ 'idCard': { $eq: req.body.idCard } })
      .exec()
      .then(user => {
         let estado = user.estado
         console.log(estado)
         if (estado == 'Ausente') {
            usersModel.findOneAndUpdate(
               { 'idCard': { $eq: req.body.idCard } },
               { $set: { 'estado': 'Presente' } },
               { new: true }
            )
               .exec()
               .then(user => {
                  console.log(user.estado)
                  res.json({ msg: 'estado alterado' })
               })
               .catch(error => {
                  console.log(error)
               })
         } else {
            usersModel.findOneAndUpdate(
               { 'idCard': { $eq: req.body.idCard } },
               { $set: { 'estado': 'Ausente' } },
               { new: true }
            )
               .exec()
               .then(user => {
                  console.log(user.estado)
                  res.json({ msg: 'estado alterado' })
               })
               .catch(error => {
                  console.log(error)
               })

         }


      })
      .catch(error => {
         console.log(error)
      })

})



//fim api
module.exports = router