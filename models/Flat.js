const mongoose = require('mongoose');
const { Schema } = mongoose

const FlatSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  users: [{ref: "User", type: Schema.Types.ObjectId}],
  rooms: [{ref: "Rooms", type: Schema.Types.ObjectId}]
});


module.exports = Flat = mongoose.model('Flat', FlatSchema);
