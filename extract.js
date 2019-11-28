var path = require('path');

var extractFilePath = function (url, catalogue) {
   var filePath;
   var fileName = 'index.html';

   if (url.length > 1) {
      fileName = url.substring(1);
   }
   console.log('The fileName is: ' + fileName);

   filePath = path.resolve(__dirname, catalogue, fileName);
   return filePath;
}

module.exports = extractFilePath;
