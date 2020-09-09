const express = require('express');
const router = express.Router();

const Flat = require('../../models/Flat');

//👇 https://express-validator.github.io/docs/ 👇
const { check, validationResult } = require('express-validator');

// @route  👉   Get api/flats
// @desc   👉   Get all WGs
// @access 👉   Public
router.get('/', (req, res) => {
  Flat.find()
    .then(flat => res.json(flat))
    .catch(err => res.status(400).json('Eror' + err));
});

// @route  👉   POST api/flats
// @desc   👉   Create WG
// @access 👉   Public

router.post('/registerwg',[
  check('name', 'You need to provide a name for the WG')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail()
], 
async (req, res) => {
  //    Returns an object with array of 
  //               errors 
  // 👇 For displaying on the front end 👇
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  console.log('Is it working?')
  const { name, email } = req.body;

  try {

    let flat = await Flat.findOne({ email });

    if (flat) {
      console.log('email used ?????')
      return res.status(400).json({ errors: [ { msg: 'Email already used' } ] });
    }

    let flatName = await Flat.findOne({ name });

    if (flatName) {
      return res.status(400).json({ errors: [ { msg: 'Name is taken. Enter different Name!' } ] });
    }
    
    flat = new Flat ({
      name,
      email
    });

    await flat.save();

    console.log(req.body);
    res.send('Flat created')

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
    
  }
});

module.exports = router;