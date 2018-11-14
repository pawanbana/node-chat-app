const path=require('path');
const express=require('express');
const socketIo =require('socket.io');
const http=require('http');
const {generatemessage,generateLocationmessage}= require('./utils/message');

const port=process.env.PORT||3300;
var app=express();
var server=http.createServer(app);
const publicpath=path.join(__dirname,"../public");
var io =socketIo(server);
app.use(express.static(publicpath));


io.on('connection',(socket)=>{

console.log("new user connected");

    socket.emit('newEmail',{
    	from:'mike@dfdfdf.com',
        text:'het whats aoo',
        createAt:'123'});

    socket.on('createEmail',(newEmail)=>{
       console.log('createEmail',newEmail);
    });
    
    socket.emit('newMessage',generatemessage('Admin','welcome to chat app'));

    socket.broadcast.emit('newMessage',generatemessage('Admin','New user Joined'));
   
   

    socket.on('createMessage',(message,callback)=>{
    	console.log('message is ',message);
    	io.emit('newMessage',generatemessage(message.from,message.text));
        callback();
    	/*socket.broadcast.emit('newMessage',{
    		from:message.from,
    		text:message.text,
    		createdAt:new Date().getTime()
    	});*/

    });

    socket.on('createLocationMessage',(coords)=>{
             /*io.emit('newMessage',generatemessage('Admin',`${coords.latitude},${coords.longitude}`));*/

             io.emit('newLocationMessage',generateLocationmessage('Admin',coords.latitude,coords.longitude));
    });

	socket.on('disconnect',()=>{
		console.log("disconnected server");
	});
   });



server.listen(port,()=>{
	console.log(`server is running at port ${port} `);

});