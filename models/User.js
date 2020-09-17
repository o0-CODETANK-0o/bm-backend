const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  userPassword: {
    type: String,
    require: true,
  },
  avatar: {
    type: String
  },
  species:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userTaskPoints: {
    type: Number,
    default: 0,
  },
  userValidationPoints: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  tasks: {
    type: Array,
  },
  inviteToken: {
    type: String,
  }

});

module.exports = User = mongoose.model('User', UserSchema);
