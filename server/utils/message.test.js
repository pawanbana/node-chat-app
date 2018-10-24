var expect=require('expect');
var {generatemessage,generateLocationmessage}=require('./message');

describe('generatemessage',()=>{
     
     it('should generate correct message',()=>{
            var from='hithere';
            var text='hellothere';

            var message =generatemessage(from,text);
            expect(message.createdAt).toBeA('number');
            expect(message).toInclude({from,text});
            

     });



});


describe('generateLocationMessage',()=>{
    

	it('should generate correct lcoation object',()=>{
            var from='hithere';
           var la=1;
           var lon=2;

           var message=generateLocationmessage(from,la,lon);
          expect(message.createdAt).toBeA('number');
          expect(message.url).toBe(`https://www.google.com/maps?q=${la},${lon}`);
        

	});
});