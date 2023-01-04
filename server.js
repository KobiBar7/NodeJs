
var express = require('express');
var bodyParser = require('body-parser');
//var morgan = require('morgan');
var config = require("./config");

var nodemailer = require('nodemailer');


var app = express();

app.use(express.static(__dirname + "\public"))


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

LoadFile();



app.get('/Test', function (req, res) {
    var listResultObJ = "okkkkkkkkkk";
    res.send(listResultObJ);
})


app.post('/SendEmail', function (req, res) { 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testeee777@gmail.com',
          pass: 'ulananlpkmktdtcb'
        }
      });
      
      var reqObj = JSON.parse(req.body.jsonObj);

      var subject = reqObj["name"] + " - "  + reqObj["email"] + " - " + reqObj["address"] + " - " + reqObj["phone"] + " - " + reqObj["subject"];
      var text = reqObj["message"];

      var mailOptions = {
        from: 'testeee777@gmail.com',
        to: 'barkobi57@gmail.com',
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return info;
        }
      });
})




function LoadFile() {
    app.use(express.static(__dirname + "\public"))
    app.use(bodyParser.json())

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //app.use(morgan('dev'));

    var normalizedPath = require("path").join(__dirname, '\public');

    app.use(express.static(normalizedPath));

    app.get('/', function (req, res) {
        var normalizedPath = require("path").join(__dirname, "public/index.html");
        res.sendfile(normalizedPath);
    });

    app.listen(config.port, function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("listen port " + config.port);
        }
    })
}



