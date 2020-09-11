const Contact = require('../models/ContactModel');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
      process.env.SENDGRID_API
    },
  })
);

exports.postContact = (req, res, next) => {
  console.log(req.body.email)
  transporter.sendMail({
    to: req.body.email,
    from: 'broommates@citromail.hu',
    subject: 'signup success',
    html: `<h1>Hello ${req.body.name}</h1><h2>You got this email so you can join our awesome Flat</h2>`,
  });
  res.send('Sent...');

  // const contact = await Contact.create(req.body);
  // res.status(201).json({ success: true, data: contact });
};