const path=require('path');
const express=require('express');


const port=process.env.PORT||3300;
const app=express();
const publicpath=path.join(__dirname,"../public");

app.use(express.static(publicpath));


app.get('/',(req,res)=>{
	res.sendFile('/index.html');

});

app.listen(port,()=>{
	console.log(`server is running at port ${port} `);

});