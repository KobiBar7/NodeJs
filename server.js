const express = require('express')
const app = express()
const port = 5000



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



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
        console.log('Email sent!');
        res.send(info);
      }
      
    });
})


