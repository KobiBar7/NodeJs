

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


app.post('/AddGoogleSheet', function (req, res) {

  (async function () {

    var ObjRes = {
      ['val']: 1,
      ['error']: '',
    }

    try {
      var google_sheets_credentials = require("./google_sheets_credentials");

      var reqObj = req.body;

      const { GoogleSpreadsheet } = require('google-spreadsheet');

      // Initialize the sheet - doc ID is the long id in the sheets URL
      const doc = new GoogleSpreadsheet(google_sheets_credentials.googleSpreadsheet);

      // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
      await doc.useServiceAccountAuth({

        client_email: google_sheets_credentials.client_email,
        private_key: google_sheets_credentials.private_key,
      });

      await doc.loadInfo(); // loads document properties and worksheets
      console.log(doc.title);


      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

      //const sheet = await doc.addSheet({ headerValues: ['title',] });

      // append rows
      const larryRow = await sheet.addRow({
        'תאריך': reqObj["Date"],
        'שם': reqObj["Name"],
        'טלפון': reqObj["Phone"],
        'כתובת': reqObj["Address"],
        'אימייל': reqObj["Email"],
        'הודעה': reqObj["Message"],
	'מכשיר': reqObj["UserAgent"],
      });
    }


    catch (error) {
      ObjRes['val'] = -1;
      ObjRes['error'] = error;
      res.send(ObjRes);

    }
    res.send(ObjRes);

  }());

})



app.post('/SendEmailArch', function (req, res) {

  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testeee777@gmail.com',
        pass: 'ulananlpkmktdtcb'
      }
    });

    var reqObj = req.body;
    var subject = reqObj["Name"] + ' - ' + 'ליד חדש';

    //var text = reqObj["message"];

    var mailOptions = {
      from: 'testeee777@gmail.com',
      to: 'barkobi57@gmail.com',
      subject: subject,
      //text: text,


      html: ''
        + '<div dir="rtl">'

        + '<div>'
        + '<span> תאריך: <span>'
        + '<span>' + reqObj["Date"] + '<span>'
        + '</div>'

        + '<br />'

        + '<div>'
        + '<span> שם מלא: <span>'
        + '<span>' + reqObj["Name"] + '<span>'
        + '</div>'

        + '<br />'

        + '<div>'
        + '<span> אימייל: <span>'
        + '<span>' + reqObj["Email"] + '<span>'
        + '</div>'

        + '<br/>'




        + '<div>'
        + '<span> מספר טלפון: <span>'
        + '<span>' + reqObj["Phone"] + '<span>'
        + '</div>'

        + '<br />'

        + '<div>'
        + '<span> כתובת : <span>'
        + '<span>' + reqObj["Address"] + '<span>'
        + '</div>'

        + '<br />'


        + '<div>'
        + '<span> הודעה: <span>'
        + '<span>' + reqObj["Message"] + '<span>'
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

