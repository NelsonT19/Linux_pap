const mongoose = require('mongoose')

const depart = mongoose.Schema({
    'departamentos':[      
            {'type':'String'}
        ]
})

module.exports = mongoose.model('depModel',depart)