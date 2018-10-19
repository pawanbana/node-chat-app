const path=require('path');
const express=require('express');
const socketIo =require('socket.io');
const http=require('http');

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
    
    socket.emit('newMessage',{
            from:'admin',
            text:'welcome to chat app'
    });

    socket.broadcast.emit('newMessage',{
    	from:'Admin',
    	text:'new user added',
    	createdAt:new Date().getTime()
    });
   

    socket.on('createMessage',(message)=>{
    	console.log('message is ',message);
    	io.emit('newMessage',{
    		from:message.from,
    		text:message.text,
    		createdAt:new Date().getTime()
    	});

    	/*socket.broadcast.emit('newMessage',{
    		from:message.from,
    		text:message.text,
    		createdAt:new Date().getTime()
    	});*/

    });

	socket.on('disconnect',()=>{
		console.log("disconnected server");
	});
   });



server.listen(port,()=>{
	console.log(`server is running at port ${port} `);

});