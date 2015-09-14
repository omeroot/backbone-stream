var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var base64 = require('base64-stream');
var fs = require('fs');

var app = express();

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/image',function(req, res){
  var stats = fs.statSync(__dirname + '/images/default.jpg');
  var fileSize = stats["size"];

  res.set('Content-Length',fileSize);



  fs.createReadStream(__dirname + '/images/default.jpg')
      .pipe(res)
      .on('finish',function(){
        res.end('thats it');
      });
  //res.sendFile(__dirname + '/images/default.jpg');
});

app.get('/player/info',function(req, res){
  res.json({
    'duration' : '10:14'
  });
});

app.get('/player',function(req, res){
  var stats = fs.statSync(__dirname + '/images/music1.mp3');
  var fileSize = stats["size"];

  res.set('Content-Length',fileSize);



  fs.createReadStream(__dirname + '/images/music1.mp3')
      .pipe(res)
      .on('finish',function(){
        res.end('thats it');
      });
  //res.sendFile(__dirname + '/images/default.jpg');
});


app.listen(1337);