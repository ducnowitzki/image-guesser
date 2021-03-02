var express=require('./config/express');
var mongoose=require('./config/mongoose');

var db=mongoose();

var port = 3000;

var app=express();
app.listen(port, '127.0.0.1');
module.exports=app;

console.log('Server is running on port ', port);
