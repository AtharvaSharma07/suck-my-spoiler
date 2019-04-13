var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var mongodb = require('mongodb');
var db
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', function (req, res) {
  
   res.send('Hello World');
})

// POST http://localhost:8080/api/users
// parameters sent with 

app.post('/api/users', function(req, res) {
    console.log(req.body)
    var Name = req.body.Name
    var Email = req.body.Email
    var PhoneNo = req.body.PhoneNo
    
 //   sendSMS({})
 var dbo = db.db("Spoilerdb");
 var myobj = { name: Name, email: Email, Phoneno: PhoneNo };
 dbo.collection("User").insertOne(myobj, function(err, res) {
   if (err) throw err;
   console.log("1 document inserted");
 });
    res.send(Name + ' ' + Email + ' ' + PhoneNo);   
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })

 var url = "mongodb://localhost:27017/mydb";
 mongodb.connect(url, function(err, dba) {
   if (err) throw err;
    db = dba
    console.log(dba)
   console.log("Database created!",db);
   //db.close();
 }); 

 function sendSMS(data){
    axios.post('https://jsonplaceholder.typicode.com/todos',data)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
   
 }