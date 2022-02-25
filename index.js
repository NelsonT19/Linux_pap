const express = require('express')
const app = express()
const path = require('path')
const connection = require('./dbconnection')
const usersModel = require('./models/usersModel')
const ejs = require ('ejs')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const { urlencoded, json } = require('express')


//bodyparser
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

//cookie parser
app.use(cookieparser())


// set the view engine to hbs
app.use(express.static('./public'));
app.set('views','views');
app.set('view engine', 'ejs')



//define rotas possiveis


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
app.use('/',require('./routes/home'))
app.use('/user',require('./routes/user'))
app.use('/table', require('./routes/tableRoute'))


let card = ''

const SerialPort = require("serialport");
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
      
      card = tag
      console.log(card)
      
     usersModel.findOne({'idCard':{$eq: tag}})
     .exec()
     .then(user =>{
        if(user==null){
           console.log('cartão n encontrado')
        }
        else{
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
      }
     })
     .catch(error=>{
        console.log(error)
     })
   })
});

app.get('/readcard', (req, res) => {
   res.json(card)
})

app.listen(3000,(error)=>{
    if(error) throw error
    console.log('listening on port 3000')
})




