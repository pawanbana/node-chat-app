var socket =io();
     
     function scrollToBottom(){
     	var messages=jQuery('#messages');
     	var newMessage=messages.children('li:last-child');
      	var clientHeight=messages.prop('clientHeight');
     	var scrollTop=messages.prop('scrollTop');
     	var scrollHeight=messages.prop('scrollHeight');

     	var newMessageHeight=newMessage.innerHeight();
     	var lastMessageHeight=newMessage.prev().innerHeight();

      if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight)>=scrollHeight)
      {
                 messages.scrollTop(scrollHeight);
      }

     };


     function gotoBottom(id){
   var element = document.getElementById(id);
   element.scrollTop = element.scrollHeight - element.clientHeight;
}
	socket.on('connect',function(){
      var params=deparam(window.location.search);

      socket.emit('join',params,function(err){
         if(err){
             alert('you entered wrong details');
             window.location.href='/';
         }else{
          console.log("fine ");

         }
      });
	});

	socket.on('disconnect',function(){
       console.log("disconnected from server ");
	});
	

  socket.on('updateUserList',function(users){
    var ol=jQuery('<ol></ol>');
    users.forEach(function (user){
      ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
  });



	socket.on('newMessage',function(message){
		var formattedTime=moment(message.createdAt).format('h:mm a');
		var template=jQuery('#message-template').html();
           var html=Mustache.render(template,{
           	text:message.text,
           	from:message.from,
           	createdAt:formattedTime});
           jQuery('#messages').append(html);
           scrollToBottom();
           gotoBottom('messages');

		/*
		var li=jQuery('<li></li>');
		li.text(`${message.from} ${formattedTime}:${message.text}`);
		jQuery('#messages').append(li);*/
	});

	socket.on('newLocationMessage',function(message){
		var formattedTime=moment(message.createdAt).format('h:mm a');
		var template=jQuery('#location-message-template').html();
           var html=Mustache.render(template,{
           	url:message.url,
           	from:message.from,
           	createdAt:formattedTime});
           jQuery('#messages').append(html);
           scrollToBottom();
           gotoBottom('messages');
		/*var formattedTime=moment(message.createdAt).format('h:mm a');
		var li=jQuery('<li></li>');
		var a=jQuery('<a target="_blank">My Current Location</a>');
		li.text(`${message.from} ${formattedTime}: `);
		a.attr('href',message.url);
		li.append(a);
		jQuery('#messages').append(li);*/
	});

	



	jQuery('#message-form').on('submit',function(e){
          e.preventDefault();

          var messageTextbox = jQuery('[name=message]');
          socket.emit('createMessage',{
          	text:messageTextbox.val()
          },function(){
              messageTextbox.val('')
          });
	});


	var locationButton=jQuery('#send-location');

	locationButton.on('click',function () {
		if(!navigator.geolocation){
			return alert('geolocation not supported by your browser');
		}
         locationButton.attr('disabled','disabled').text('Sending location......');
		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disabled').text('Send location');
             socket.emit('createLocationMessage',{
             	latitude:position.coords.latitude,
             	longitude:position.coords.longitude

             });
		},function(){
			locationButton.removeAttr('disabled').text('Send location');

			alert('unable to fetch location');
		})
	})