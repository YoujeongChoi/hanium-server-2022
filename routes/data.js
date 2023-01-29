var router = require('express').Router();

var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort; 

const path = require('path');
const { ReadlineParser } = require("serialport");

var serialPort = new SerialPort( {
    path : "COM4",
    baudRate  :9600
    // parser: serialPort.parsers.readline("\n")
});

const parser = new ReadlineParser();
serialPort.pipe(parser);


const http = require('http');
const server = http.createServer(router);
var Server = require('socket.io');
var Server = Server.Server;
const io = new Server(server);


router.get('/', (req, res) => {
  // res.sendFile(__dirname + "/public/index.html"); // html 문서를 지정해 준다.
  res.render('datam.ejs');
});

io.on('connection' , (socket) => {
  console.log('a user connected');
  socket.on('disconnected', () => {
    console.log('user disconnected');
  });

  socket.emit('result', '${socket.id}로 연결되었습니다.');
  parser.on('data', function(data) {
    console.log("data: ", data);
    socket.emit('data', data);
  });

  socket.on('message', (msg) => { //받고
		console.log("클라이언트의 요청이 있습니다.");
		console.log(msg);
		socket.emit('result', `수신된 메세지는 "${ msg }" 입니다.`);
	});
});


module.exports = router;


// serialPort.on("open", function () { 
//     console.log('open'); 
//     serialPort.on('data', function(data) { 
//       console.log('dust data : ',data[0],data[1], data.length); 
//     }); 
//   });