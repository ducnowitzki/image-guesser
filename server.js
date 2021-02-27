var express=require('./config/express');
var mongoose=require('./config/mongoose');

var db=mongoose();
var app=express();
app.listen(3000, '127.0.0.1');
module.exports=app;

console.log('Server is running');
