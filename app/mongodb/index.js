var Mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/usersDB';

Mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   function(err) {
      if (err) throw err;
      console.log('successfully Connected');
   });

var userSchema = Mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   room: {
      type: String,
      default: 'Main'
   },
   created: {
      type: Date,
      default: Date.now
   }
})

var User = Mongoose.model('User', userSchema);

module.exports = User;
//
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // Connection URL
//
// // Database Name
// const dbName = 'myproject';
//
// // Create a new MongoClient
// const client = new MongoClient(url);
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   client.close();
// });
