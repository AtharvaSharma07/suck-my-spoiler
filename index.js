//Import package dependecies.
var express = require('express');
require('./db').initDB()
var app = express();
var bodyParser = require('body-parser');




//Import routes.
const routes = require('./routes/route');


//Middleware to get json data.
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//  Connect all our routes to our application
app.use('/', routes);


//Start express server.
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Spoiler app listening at http://%s:%s", host, port)
})