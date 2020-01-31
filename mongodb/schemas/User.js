const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
   // _id: new mongoose.Types.ObjectId(), //id для возможности ссылки на юзера из сообщения
   username: {
      type: String,
      required: true
   },
   room: {
      type: String,
   },
   created: {
      type: Date,
      default: Date.now
   }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
