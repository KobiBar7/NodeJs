

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

  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testeee777@gmail.com',
        pass: 'ulananlpkmktdtcb'
      }
    });


    var reqObj = req.body;

    var subject = "לשנות שם נושא - ליד חדש אתר מירן";


    //var text = reqObj["message"];



    var mailOptions = {
      from: 'testeee777@gmail.com',
      to: 'barkobi57@gmail.com',
      subject: subject,
      //text: text,


      html: ''
        + '<div>'  

        + '<div>'
        + '<span> שם מלא: <span>'
        + '<span>' + reqObj["name"] + '<span>'
        + '</div>'

        + '<br />'

        + '<div>'
        + '<span> אימייל: <span>'
        + '<span>' + reqObj["email"] + '<span>'
        + '</div>'

        + '<br/>'


        + '<div>'
        + '<span> כתובת: <span>'
        + '<span>' + reqObj["address"] + '<span>'
        + '</div>'

        + '<br />'


        + '<div>'
        + '<span> מספר טלפון: <span>'
        + '<span>' + reqObj["phone"] + '<span>'
        + '</div>'

        + '<br />'


        + '<div>'
        + '<span>  נושא: <span>'
        + '<span>' + reqObj["subject"] + '<span>'
        + '</div>'

        + '<br />'


        + '<div>'
        + '<span> הודעה: <span>'
        + '<span>' + reqObj["name"] + '<span>'
        + '</div>'

        + '<br />'

        + '<div>'

    };


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent!');
        res.send(info);
      }

    });
  }

  catch (error) {
    console.log('Email Not sent!');
    res.send(error);
  }

})


