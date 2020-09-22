const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
 
  status: {
    default:false,
    type: Boolean,
  },
});

const RoomSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
  },
  tasks: {
    monthly: { type: [TaskSchema] },
    weekly: { type: [TaskSchema] },
  },
});

const FlatSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  users: [{ ref: 'User', type: Schema.Types.ObjectId }],
  rooms: [RoomSchema],
});

module.exports = Flat = mongoose.model('Flat', FlatSchema);
