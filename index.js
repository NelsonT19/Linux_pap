const express = require('express')
const app = express()
var indexRouter = require("./routes/loginrouter")
const path = require('path')
const connection = require('./dbconnection')
const usersModel = require('./models/usersModel')
const hbs = require ('hbs')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const { urlencoded } = require('express')
const homeRoute = require('./routes/home')
const userRoute = require('./routes/user')



//bodyparser
app.use(urlencoded({ extended : false}))

//cookie parser
app.use(cookieparser())


// set the view engine to hbs
app.use(express.static('./public'))
app.set('view engine', 'hbs')


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
app.use('/',homeRoute)
app.use('/user',userRoute)



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




