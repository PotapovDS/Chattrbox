var http = require('http');
var fs = require('fs');
var extract = require('./extract');

var handleError = function (err, res) {
   res.writeHead(404);
   res.write('<h1>Error 404, the page is not found</h1>');
   res.end();
};

var server = http.createServer((req, res) => {
   console.log('Responding to a request.');
   var filePath = extract(req.url);
   console.log(filePath);
   fs.readFile(filePath, function (err, data){
      if (err) {
         handleError(err, res);
         return;
      } else {
         res.end(data);
      }
   });
});

server.listen(3000);
