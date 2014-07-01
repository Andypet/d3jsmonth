/**
 * EmailControllerController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

router.post("/send", function(req, res){
  console.log("sending a scripppt");
    console.log(req.body);
  var params = req.body;
  console.log(params);

  if(!params.email){
    res.send(500);
  }
  var msg = [];
  msg = 'Someone Has Contact You From the Website!\n';
  msg += '------------------------------------------\n';
  if(params.name){
    msg += 'Name: ' + params.name + '\n';
  }

  if(params.email){
    msg += 'Email: ' + params.email + '\n';
  }

  if(params.phone){
    msg += 'Phone Number: ' + params.phone + '\n';
  }

  msg += 'Subject: Someone has contacted you from D3js.kingtak.us \n';
  msg += 'Message: \n';
  msg += params.message + '\n';

  var smtpTransport = nodemailer.createTransport("SMTP",{
     service: "Gmail",
     auth: {
         user: "kingtak.w@gmail.com",
         pass: "^1!M54F%RRFe3&!"
     }
  });

  var mailOptions = {
    from: params.name + '<' + params.email + '>' || 'nobody@nobody.com',
    to: "kingtak.w@gmail.com", 
    subject: "Contact From Kingtak.us",
    text: msg        
  };

  smtpTransport.sendMail(mailOptions, function(err, response){
    if(err){
      res.send(500, "Error Sending " + err);
    }else{
      res.send(200, response);
    }
  });
  
});

module.exports = router;