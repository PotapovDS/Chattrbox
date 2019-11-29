var http = require('http');
var extract = require('./extract');
var readFile = require('./src/readFile');
var wss = require('./websockets-server');

var server = http.createServer((req, res) => {
   console.log('Responding to a request.');

   var filePath = extract(req.url, 'app');
   readFile (filePath, res);

});

server.listen(3000);
