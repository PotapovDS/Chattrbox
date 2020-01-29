const mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
   username: {
      type: String
   },
   room: {
      type: String,
      default: 'Main'
   },
   created: {
      type: Date,
      default: Date.now
   },
   text: {
      type: String
   }
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
