//import depedences of RFID

const SerialPort = require("serialport");

function readCard(callback) {
    //configuração da serialport
    const ReadLine = SerialPort.parsers.Readline;
    const parser = new ReadLine({delimiter: '\r\n'});
    const mySerial = new SerialPort("/dev/ttyACM0", {
        baudRate:9600,
    });
    let d = []
    mySerial.pipe(parser);
    mySerial.on('open',(cb)=>{
        parser.on('data', (d)=>{
           console.log(data);
           d.push(data)
           return d
        })
        callback(d)
     });
     
}

module.exports = {readCard}