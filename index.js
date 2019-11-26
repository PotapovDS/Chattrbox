var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
   console.log('Responding to a request.');
   var url = req.url;

   var fileName = 'index.html';
   if (url.length > 1) {
      fileName = url.substring(1);
   }
   console.log(fileName);
   fs.readFile('app/index.html', function (err, data){
      res.end(data);
   });
});
server.listen(3000);
