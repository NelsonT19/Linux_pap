
const express = require('express')
const router = express.Router()
// api read card 

router.get('/', (req,res)=>{
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
         //console.log(data); 
         mySerial.close()
         res.json({cardID: data})
        console.log(data)
        //tranformar num json
          
        
          
      })
   });

   })
   
  //fim api
  module.exports = router