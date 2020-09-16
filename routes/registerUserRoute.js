const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.patch('/', async (req, res) => {

   
  let user = await User.findOneAndUpdate(
    {
      inviteToken: req.body.token,
      
    },
    req.body,{new:true}
  );
 if(user){
    res.send(user)
 }else{
    res.send({error:"Please check your token!"})
 }

});

module.exports = router;
