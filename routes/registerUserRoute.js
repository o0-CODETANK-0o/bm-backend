const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flat = require('../models/Flat');

router.patch('/', async (req, res) => {
  let user = await User.findOneAndUpdate(
    {
      inviteToken: req.body.token,
    },
    req.body,
    { new: true }
  );
  if (user) {
    console.log(user.inviteFlatID);
    let flat= await Flat.findById(user.inviteFlatID);
    flat.users.push(user._id)
    flat=await flat.save()
    
    res.send({user,flat});
  } else {
    res.send({ error: 'Please check your token!' });
  }
});

module.exports = router;
