const mongoose = require('mongoose');
var User = require('./schemas/User');
var Message = require('./schemas/Message');

const url = 'mongodb://localhost:27017/usersDB';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', err => {
   console.log('error', err);
});

db.once('open', () => {
   console.log('db connected');
});

exports.User = User;
exports.Message = Message;
exports.DB = mongoose;
