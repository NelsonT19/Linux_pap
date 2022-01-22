const express = require('express')
const loginrouter = express.Router()


loginrouter.get('/', (req,res)=> {
    
    res.render("index",{
        isAuthenticated:req.oidc.isAuthenticated(),
        user: req.oidc.user,
    })
})


loginrouter.get('/insertUtilizador', (req,res)=> {
    
    res.render("insertUtilizador",{
        isAuthenticated:req.oidc.isAuthenticated(),
        user: req.oidc.user,
    })
})


loginrouter.get('/mainTracking', (req,res)=> {
    
    res.render("mainTracking",{
        isAuthenticated:req.oidc.isAuthenticated(),
        user: req.oidc.user,
    })
})
module.exports = loginrouter;