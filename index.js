const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;
const connection = require('./dbconnection')
var indexRouter = require("./routes/loginrouter")

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
app.use(express.json({extended:false}))

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
app.use('/utilizador',require('./routes/inserirutilizadorRoute'))





const {readCard} = require('./readCard')

app.get('/readcard', (req,res)=>{
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
         console.log(data); 
         mySerial.close()
         res.json({cardID: data})
          //enviar em formato JSON
          let tagCard = document.getElementById('tag').value = data;
          
         
      })
   });

   })


   app.listen(PORT, function(){
      console.log(`Server is running on PORT: ` + PORT);
   });


//import depedences of RFID
/*
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
      console.log(data);

      
   })
});*/
