const express = require('express')
const app = express()
var indexRouter = require("./routes/loginrouter")
const path = require('path')
const connection = require('./dbconnection')
const usersModel = require('./models/usersModel')


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



/*
const SerialPort = require("serialport");
const { send } = require('process')
//configuração da serialport
const ReadLine = SerialPort.parsers.Readline;
const parser = new ReadLine({delimiter: '\r\n'});
const mySerial = new SerialPort("/dev/ttyACM0", {
   baudRate:9600,
});
mySerial.pipe(parser);
mySerial.on('open',function(){
   console.log('Connection whit RFID initialised...');
   parser.on('data', function (data){
      let tag = data.replace(/\s/g,'')
      //mySerial.close()
      console.log(tag)
      
     usersModel.findOne({'idCard':{$eq: tag}})
     .exec()
     .then(user =>{
        let estado = user.estado
        console.log(estado)
        if(estado == 'Ausente'){
           usersModel.findOneAndUpdate(
              {'idCard': {$eq:tag}}, 
              {$set: {'estado': 'Presente'}},
              {new:true}
           )
           .exec()
           .then(user =>{
              console.log(user.estado)
              //console.log('estado alterado')
           })
           .catch(error=>{
              console.log(error)
           })
        }else{
           usersModel.findOneAndUpdate(
              {'idCard': {$eq:tag}}, 
              {$set: {'estado': 'Ausente'}},
              {new:true}
           )
           .exec()
           .then(user =>{
              console.log(user.estado)
             // console.log('estado alterado')
           })
           .catch(error=>{
              console.log(error)
           })

        }

  
     })
     .catch(error=>{
        console.log(error)
     })
     
   })
});
*/

  
app.listen(3000,(error)=>{
    if(error) throw error
    console.log('listening on port 3000')
})




