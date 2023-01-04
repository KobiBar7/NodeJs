

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;
const nodemailer = require('nodemailer');



// Configuring body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use(cors({
  origin: '*'
}));   



// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})



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
    
    var reqObj = req.body;

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
        res.send(error);
      } else {
        console.log('Email sent!');
        res.send(info);
      }
      
    });
})


