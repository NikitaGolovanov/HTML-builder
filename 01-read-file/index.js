const fs = require('fs');
const stream = fs.createReadStream('./01-read-file/text.txt','utf-8');
stream.on('data',(data) => {
  console.log(data);
});