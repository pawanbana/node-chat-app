const path=require('path');
const express=require('express');
const socketIo =require('socket.io');
const http=require('http');
const {generatemessage,generateLocationmessage}= require('./utils/message');
const {isRealString}=require('./utils/validation');
const {Users}=require('./utils/users');
const port=process.env.PORT||3300;
var app=express();
var server=http.createServer(app);
const publicpath=path.join(__dirname,"../public");
var io =socketIo(server);
app.use(express.static(publicpath));

var users=new Users();

io.on('connection',(socket)=>{

console.log("new user connected");

    
   
   
   socket.on('join',(params,callback)=>{
      if(!isRealString(params.name)||!isRealString(params.room)){
        return callback('Name and room name required');
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);

      io.to(params.room).emit('updateUserList',users.getUserList(params.room));

      //socket.leave(params.room);
      //io.emit ->io.to(params.room).emit;
      //socket.broadcast.emit->socket.broadcast.to(params.room).emit;
      //socket.emit
        socket.emit('newMessage',generatemessage('Admin','welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generatemessage('Admin',`${params.name} has joined`));
      callback();

   });

    socket.on('createMessage',(message,callback)=>{
    	
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
        var user=users.removeUser(socket.id);
       if(user){
        io.to(user.room).emit('updateUserList',users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generatemessage('Admin',`${user.name} has left `));

       }
		console.log("disconnected server");
	});
   });



server.listen(port,()=>{
	console.log(`server is running at port ${port} `);

});