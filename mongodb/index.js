var mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/usersDB';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', err => {
   console.log('error', err);
});

db.once('open', () => {
   console.log('db connected');
});

var userSchema = mongoose.Schema({
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

var User = mongoose.model('User', userSchema);

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
