var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");            1

var app = express();
app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "pages/flappyBus.html"));
});
app.post("/score", function(request, response){
    console.log(request.body);
    response.send(request.body.fullName);
});

var server = app.listen((process.env.PORT || 8080), function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Bob's Flappy Bird listening at http://%s:%s", host, port);
});

