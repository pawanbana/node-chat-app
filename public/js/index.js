var socket =io();

	socket.on('connect',function(){
       console.log("connected to server ");
       socket.emit('createEmail',{
       	to:'fdgfsgsfsg',
       	text:'efffgfsff'
       });

       
	});

	socket.on('disconnect',function(){
       console.log("disconnected from server ");
	});
	
   
	socket.on('newEmail',function(email){
         
         console.log('new email',email);
	});


	socket.on('newMessage',function(message){
		console.log('message is ',message);
	});