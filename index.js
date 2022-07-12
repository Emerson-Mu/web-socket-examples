//imports
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

//configs
var app = express();
var server = http.Server(app);
var socketio = socketIO(server);
const PORT = 3000 || process.env.PORT;


//server init
server.listen(PORT,function(){
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//express routes
app.get('/',function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

//socket.io
socketio.on('connection', function (websocket) {

    let nombreCliente = "";

	console.log("Usuario Conectado");
    
    //On:Modo de escucha
	websocket.on('disconnect', function(){
    	console.log('Usuario '+nombreCliente+' Desconectado');
  	});

    websocket.on("nombreCliente",function(nombreCli){
        nombreCliente = nombreCli;
        console.log("Nombre recibido: "+nombreCliente);
    });

    websocket.on('mensaje de chat',function(mensaje){
        console.log("Mensaje del cliente "+nombreCliente+": " + mensaje);
        websocket.emit("mensaje broadcast", mensaje);
    });
});
