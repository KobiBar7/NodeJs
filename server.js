

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


app.post('/Arch_AddNewSheet', function (req, res) {

  (async function () {

    var ObjRes = {
      ['val']: 1,
      ['error']: '',
    }

    try {
      var google_sheets_arch_newUsers = require("./google_sheets_arch_newUsers");

      var reqObj = req.body;

      const { GoogleSpreadsheet } = require('google-spreadsheet');

      // Initialize the sheet - doc ID is the long id in the sheets URL
      const doc = new GoogleSpreadsheet(google_sheets_arch_newUsers.googleSpreadsheet);

      // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
      await doc.useServiceAccountAuth({

        client_email: google_sheets_arch_newUsers.client_email,
        private_key: google_sheets_arch_newUsers.private_key,
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


app.post('/Arch_UpdateGoogleSheetAnalytics', function (req, res) {

  (async function () {

    var ObJSheets = {
      'Instagram': 0,
      'Waze': 0,
      'Facebook': 0,
      'Whatsapp': 0,
      'CallPhone': 0,
      'CheckMatch': 0,
      'OpenFormModal': 0,
      'AddNewUser': 0,
    }

    var ObjRes = {
      ['val']: 1,
      ['error']: '',
    }

    try {
      var google_sheets_arch_analytics = require("./google_sheets_arch_analytics");

      var reqObj = req.body;

      const { GoogleSpreadsheet } = require('google-spreadsheet');

      // Initialize the sheet - doc ID is the long id in the sheets URL
      const doc = new GoogleSpreadsheet(google_sheets_arch_analytics.googleSpreadsheet);

      // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
      await doc.useServiceAccountAuth({

        client_email: google_sheets_arch_analytics.client_email,
        private_key: google_sheets_arch_analytics.private_key,
      });

      await doc.loadInfo(); // loads document properties and worksheets
      console.log(doc.title);


      const worksheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

      const rows = await worksheet.getRows();
      rows.forEach((row) => {
        console.log(row.Title);

        ObJSheets.Instagram = parseInt(row.Instagram);
        ObJSheets.Facebook = parseInt(row.Facebook);
        ObJSheets.Whatsapp = parseInt(row.Whatsapp);
        ObJSheets.Waze = parseInt(row.Waze);
        ObJSheets.CallPhone = parseInt(row.CallPhone);
        ObJSheets.CheckMatch = parseInt(row.CheckMatch);
        ObJSheets.OpenFormModal = parseInt(row.OpenFormModal);
        ObJSheets.AddNewUser = parseInt(row.AddNewUser);
      });


      await rows[0].del();

      if (ObJSheets[req.body.ColumnName] > -1) {
        ObJSheets[req.body.ColumnName]++;
      }


      //const worksheet = await doc.addSheet({ headerValues: ['title',] });
      // append rows
      const larryRow = await worksheet.addRow({
        'Instagram': ObJSheets.Instagram,
        'Facebook': ObJSheets.Facebook,
        'Whatsapp': ObJSheets.Whatsapp,
        'Waze': ObJSheets.Waze,
        'CallPhone': ObJSheets.CallPhone,
        'CheckMatch': ObJSheets.CheckMatch,
        'OpenFormModal': ObJSheets.OpenFormModal,
        'AddNewUser': ObJSheets.AddNewUser,
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
        pass: 'fjatebyhujflnntv'
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





app.post('/SendEmailYad', function (req, res) {

  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'formail060@gmail.com',
        pass: 'loezuwrwbwwiwqqa'
      },

      tls: {
        rejectUnauthorized: false
    }
    });

  

    var reqObj = JSON.parse(req.body.jsonObj);
    var subject = reqObj["subject"];
    var html = reqObj["TextFile"];


    html = reqObj["TextFile"].replace(/\"/g, '"');

    //var text = reqObj["message"];

    var mailOptions = {
      from: 'formail060@gmail.com',
      to: 'barkobi57@gmail.com',
      subject: subject,
      //text: text,


      html: html

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




app.post('/SendEmail', function (req, res) {

  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'formail060@gmail.com',
        pass: 'loezuwrwbwwiwqqa'
      },

      tls: {
        rejectUnauthorized: false
    }
    });


    var reqObj = req.body;
    var subject = reqObj["subject"];
    var html = reqObj["TextFile"];
    var emailTo = reqObj["EmailTo"];


    //var text = reqObj["message"];

    var mailOptions = {
      from: 'formail060@gmail.com',
      to: emailTo,
      subject: subject,
      //text: text,


      html: html

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