const express = require('express')
const app = express()
var indexRouter = require("./routes/loginrouter")
const path = require('path')
const connection = require('./dbconnection')


// set the view engine to ejs

const { auth } = require('express-openid-connect');
require('dotenv').config({path: './private/.env'})

   const config = {
   authRequired:false,
   auth0Logout:true,
   issuerBaseURL: process.env.ISSUER_BASE_URL,
   baseURL: process.env.BASE_URL,
   clientID:  process.env.CLIENT_ID,
   secret:  process.env.SECRET,
     
   }

   app.set('views','views');
   app.set('view engine', 'ejs');
   app.use(express.json());
   app.use(express.urlencoded({extended:true}));
   app.use(express.static('./public'));
   app.use(auth(config))

   app.use("/", indexRouter)

//pase url-encoded bodies (as sent by html forms)
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))


//define rotas possiveis


app.get('/',function(req,res){
   res.render("../views/index");
});

app.get('/mainTracking',function(req,res){
   res.render("../views/mainTracking");
});

app.get('/insertUtilizador',function(req,res){
   res.render("../views/insertUtilizador");
});

app.use('/formdata',require('./routes/formdataRoute'))
app.use('/dep',require('./routes/depRoute'))
app.use('/createCard', require('./routes/createUsersRoute'))
app.use('/readcard', require('./routes/readCardRoute'))




  
app.listen(3000,(error)=>{
    if(error) throw error
    console.log('listening on port 3000')
})




