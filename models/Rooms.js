const mongoose = require('mongoose');
const { Schema } = mongoose

const RoomsSchema = new Schema({
  rooms: [
    {
      roomName: "kitchen",
      exist: {type: Boolean, default: false},
      tasks: [
        {
          task: "mop the floor",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the cooking station",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "broom/vacuum the floor",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the baking plates and oven",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the fridge inside/outside",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "empty and clean the trash bins",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the sink",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the windows",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the door knobs",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "remove spiderwebs from the ceiling",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        }
      ]
    },
    {
      roomName: "bathroom",
      exist: {type: Boolean, default: false},
      tasks: [
        {
          task: "mop the floor",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the mirror",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "broom/vacuum the floor",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the shower/tub",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the toilet",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "empty and clean the trash bins",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the sink",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the windows",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the door knobs",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "change the carpet",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "remove spiderwebs from the ceiling",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        }            
      ]
    },
    {
      roomName: "living-room",
      exist: {type: Boolean, default: false},
      tasks: [
        {
          task: "mop the floor",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the windows",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "broom/vacuum the floor",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the door knobs",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "remove spiderwebs from the ceiling",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "dust all the surfaces",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "vacuum the couch / under the couch",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        }   
      ]
    },
    {
      roomName: "main entrance/corridor",
      exist: {type: Boolean, default: false},
      tasks: [
        {
          task: "mop the floor",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "change the carpet",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "broom/vacuum the floor",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "clean the door knobs",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        },
        {
          task: "remove spiderwebs from the ceiling",
          points: 10,
          isDone: {
            type: Boolean,
            default: false
          }
        }
      ]
    }
  ]
});


module.exports = Rooms = mongoose.model('Rooms', RoomsSchema);
