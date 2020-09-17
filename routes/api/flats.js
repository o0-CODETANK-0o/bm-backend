const express = require('express');
const router = express.Router();
const {show_wgs, create_wg} = require('../../controllers/flatController')
const Flat = require('../../models/Flat');

//👇 https://express-validator.github.io/docs/ 👇
const { check } = require('express-validator');

// @route  👉   Get api/flats
// @desc   👉   Get all WGs
// @access 👉   Public

router.get('/', show_wgs);

// @route  👉   POST api/flats
// @desc   👉   Create WG
// @access 👉   Public

router.post('/registerwg',[
  check('name', 'You need to provide a name for the WG')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail()
], create_wg);

module.exports = router;