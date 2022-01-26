
const mongoose = require('mongoose')

const user = mongoose.Schema({
    'idCard' : {'type': 'String'},
    'nome' : {'type': 'String'},
    'morada_rua' : {'type': 'String'},
    'morada_num' : {'type': 'String'},
    'datanascimento' : {'type': 'string'},
    'email' : {'type': 'String'},
    'telemovel' : {'type': 'Number'},
    'departamento' : {'type': 'String'},
    'estado': {'type' : 'String'},
    date: {'type': Date, default: Date.now}
})

module.exports = mongoose.model('usersModel',user)