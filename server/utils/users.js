[{
	id:'anything',
	name:'name',
	room:'user room'
}]


//adduser(id,name,room)
//removeuser(id)
//get user(id)
//get userlist(room)
 
 class Users{

 	constructor(){
         this.users=[];
 	}
    addUser(id,name,room){
    	var user={id,name,room};
    	this.users.push(user);
    	return user;
    }
    removeUser(id){
         var user=this.users.filter((user)=>user.id===id)[0];
         if(user){
               this.users=this.users.filter((user)=>user.id!==id);
         }
         return user;
      

    }
    getUser(id){
    	return this.users.filter((user)=>user.id===id)[0];
    	

    }
    getUserList(room){
        var users=this.users.filter((user)=>{
        	return user.room===room;
        });
        var namesArray=users.map((user)=>{
            return user.name;
        });
        return namesArray;
    }
 }



module.exports={Users};


/*
class Person {
      constructor ( name,age){
             this.name=name;
             this.age=age;
      }
      getUserDescription(){
      	return `${this.name} is 1 year old `; 
      }

}

var me =new Person('pawdddan',25);

console.log(me.name,me.age);
	console.log(me);


var description=me.getUserDescription();
console.log(description);*/