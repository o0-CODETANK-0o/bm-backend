const Contact = require('../models/ContactModel');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto =require("crypto")



const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
      process.env.SENDGRID_API
    },
  })
);

exports.postContact =async(req, res, next) => {
  console.log(req.body.email)

  const token=await crypto.randomBytes(20).toString("hex")
  // const user=await User.findOne({ req.body.email})
       
  transporter.sendMail({
    to: req.body.email,
    from: 'broommates@citromail.hu',
    subject: 'signup success',
    html: `<h1>Hello ${req.body.name}</h1><h2>You got this email so you can join our awesome Flat</h2><br/> `,
  });
  res.send('Sent...');

  // const contact = await Contact.create(req.body);
  // res.status(201).json({ success: true, data: contact });
};