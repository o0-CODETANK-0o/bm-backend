// @show all wgs
module.exports.show_wgs = (req, res) => {
  Flat.find()
  .then(flat => res.json(flat))
  .catch(err => res.status(400).json('Eror' + err));
}


// @create a wg
const { validationResult } = require('express-validator');

module.exports.create_wg = async (req, res) => {
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
}