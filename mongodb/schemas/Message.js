const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  username: {
    type: String,
  },
  room: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
