var expect=require('expect');
var {generatemessage}=require('./message');

describe('generatemessage',()=>{
     
     it('should generate correct message',()=>{
            var from='hithere';
            var text='hellothere';

            var message =generatemessage(from,text);
            expect(message.createdAt).toBeA('number');
            expect(message).toInclude({from,text});
            

     });



});