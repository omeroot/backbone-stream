var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/image',function(req, res){
  var stats = fs.statSync(__dirname + '/images/default1.jpg');
  var fileSize = stats["size"];

  res.set('Content-Length',fileSize);
  var counter = 0;
  fs.createReadStream(__dirname + '/images/default1.jpg')
      .on('data',function(data){
        counter += 1;
        console.log(counter);
      })
      .pipe(res)
      .on('finish',function(){
        res.end('thats it');
      });
  //res.sendFile(__dirname + '/images/default.jpg');
});



app.listen(1337);