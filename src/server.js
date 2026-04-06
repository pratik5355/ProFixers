var express = require("express");
var bodyParser =require("body-parser");
var app = express();
//Here we are configuring express to use body-parser as middle-ware.
//app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/'));

app.get('/',function(req,res)
{
res.sendfile("index.html");
});



app.listen(3000,function()
{
console.log("Server started on Port 3000"); 
});