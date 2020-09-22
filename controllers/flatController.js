
const User = require('../models/User'); 
const Flat = require('../models/Flat'); 
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

postUser = async (flat, userData) => {
  console.log(userData);

  const token = crypto.randomBytes(20).toString('hex');
  
  const newUser = new User
  newUser.userEmail = userData.userEmail;
  newUser.inviteToken = token 
  newUser.inviteFlatID=flat._id;
  console.log('mail->',process.env.EMAIL_SENDER)
  // newUser.inviteTokenExpires = Date.now() + 86400000;
  let dbUser = await newUser.save()

  //Find a task in the WG without a UserID, then update the UserID key of the task with the new user's id
  flat.users.push(dbUser._id) 
  const emptyRoom=flat.rooms.find(room=>!room.userId)
  if(emptyRoom){
    emptyRoom.userID=dbUser._id
  }
  // await flat.save()
  transporter.sendMail({
    to: userData.userEmail,
    from: process.env.EMAIL_SENDER,
    subject: 'signup success',
    html: `<h1>Hello ${userData.name}</h1><h2>You got this email so you can join our awesome Flat at :
    <a href="http://localhost:3000/RegisterUser/${token}">here</a></h2>`,
  });
  console.log(dbUser)
  // res.send('Sent...');

  // }).catch(err => {
  //   console.error(err)
  // })

  // const contact = await Contact.create(req.body);
  // res.status(201).json({ success: true, data: contact });
};

// @show all wgs
module.exports.show_wgs = (req, res) => {
  Flat.find()
    .then(flat => res.json(flat))
    .catch(err => res.status(400).json('Eror' + err));
}


// @create a wg
const {
  validationResult
} = require('express-validator');

module.exports.create_wg = async (req, res) => {
  //    Returns an object with array of 
  //               errors 
  // 👇 For displaying on the front end 👇
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  console.log('Is it working?')
  const {
    name,
    email
  } = req.body;

  try {
 
    let flatName = await Flat.findOne({
      name
    });

    if (flatName) {
      return res.status(400).json({
        errors: [{
          msg: 'Name is taken. Enter different Name!'
        }]
      });
    }

    let admin = new User(req.body.admin);
    admin.isAdmin = true;
    flat = new Flat(req.body.flat);
    flat.rooms=req.body.flat.rooms
    console.log(req.body.flat.rooms)
    admin = await admin.save();
    flat.users = [admin._id];
    flat = await flat.save();
    const users = req.body.users;
    users.forEach(user => postUser(flat, user));
    flat = await flat.save();

    
    res.send(flat);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');

  }
}




module.exports.flatInfo=async(req,res)=>{
const flatFound=await Flat.findById(req.params.id)

res.send(flatFound)
}




module.exports.defaultRooms=(req,res)=>{



  //  roomName: "kitchen",
     
  //     tasks: [
  //       {
  //         task: "mop the floor",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the cooking station",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "broom/vacuum the floor",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the baking plates and oven",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the fridge inside/outside",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "empty and clean the trash bins",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the sink",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the windows",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the door knobs",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "remove spiderwebs from the ceiling",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     roomName: "bathroom",
  //     exist: {type: Boolean, default: false},
  //     tasks: [
  //       {
  //         task: "mop the floor",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the mirror",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "broom/vacuum the floor",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the shower/tub",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the toilet",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "empty and clean the trash bins",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the sink",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the windows",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the door knobs",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "change the carpet",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "remove spiderwebs from the ceiling",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       }            
  //     ]
  //   },
  //   {
  //     roomName: "living-room",
  //     exist: {type: Boolean, default: false},
  //     tasks: [
  //       {
  //         task: "mop the floor",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the windows",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "broom/vacuum the floor",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the door knobs",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "remove spiderwebs from the ceiling",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "dust all the surfaces",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "vacuum the couch / under the couch",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       }   
  //     ]
  //   },
  //   {
  //     roomName: "main entrance/corridor",
  //     exist: {type: Boolean, default: false},
  //     tasks: [
  //       {
  //         task: "mop the floor",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "change the carpet",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "broom/vacuum the floor",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "clean the door knobs",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       },
  //       {
  //         task: "remove spiderwebs from the ceiling",
  //         points: 10,
  //         isDone: {
  //           type: Boolean,
  //           default: false
  //         }
  //       }
  //     ]
}