const Contact = require('../models/ContactModel');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

exports.postContact = (req, res, next) => {
  console.log(req.body.email);

  const token = crypto.randomBytes(20).toString('hex');
  const newUser = new User
  newUser.userEmail = req.body.email;
  newUser.inviteToken = token;
  // newUser.inviteTokenExpires = Date.now() + 86400000;
  newUser.save()
    .then(dbUser => {
      transporter.sendMail({
        to: req.body.email,
        from: 'broommates@citromail.hu',
        subject: 'signup success',
        html: `<h1>Hello ${req.body.name}</h1><h2>You got this email so you can join our awesome Flat at :
    <a href="http://localhost:3000/RegisterUser/${token}">here</a></h2>`,
      });
      console.log(dbUser)
      res.send('Sent...');

    }).catch(err => {
      console.error(err)
    })

  // const contact = await Contact.create(req.body);
  // res.status(201).json({ success: true, data: contact });
};