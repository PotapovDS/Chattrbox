'use strict';
var fs = require('fs');
var mime = require('mime');

var handleError = function (err, res) {
   res.writeHead(404);
   res.write('<h1>Error 404, the page is not found</h1>');
   res.end();
};

var readFile = function (filePath, res){

   fs.readFile(filePath, function (err, data){
      if (err) {
         handleError(err, res);
      } else {
         res.setHeader('Content-Type', mime.getType(filePath));
         res.end(data);
      }
   });

}

module.exports = readFile;
