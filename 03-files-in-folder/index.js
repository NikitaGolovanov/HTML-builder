const fs = require('fs');

fs.readdir((__dirname, './03-files-in-folder/secret-folder'),
    (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        fs.stat(`${__dirname}/secret-folder/${file}`,(error, stat) => {
            if (stat.isFile())
            console.log(file.split('.').join(' - ')+' - '+stat.size+' bytes');
        })
        
      })
    }
  })