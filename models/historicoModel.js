
const mongoose = require('mongoose')

const hitorico = mongoose.Schema({
    
    'historico':[

            {'idCard' : {'type': 'String'}},
            {'nome':{'type':'String'}},
            {'Departamento' : {'type': 'String'}},
            {'estado': {'type' : 'String'}},
            {'date': {'type': Date, default: Date.now}}

        ]
    
})

module.exports = mongoose.model('historicoModel',hitorico)