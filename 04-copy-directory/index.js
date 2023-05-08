const fs = require('fs');

var src = `${__dirname}/files`;
var dest = `${__dirname}/copy-files`;

function CopyDir (src,dest) {
fs.exists(dest, exists => { 
    if (!exists) { 
        fs.mkdir(dest, (error) => {
            if (error) console.log(error)
        })
        fs.readdir(src, (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                fs.copyFile(`${src}/${file}`,`${dest}/${file}`, err => {
                if (err) console.log(err); 
                })
              })
            }
        })
    }

    if (exists) {
        fs.readdir(dest, (err, files) => {
            if (err) console.log(err)
              
            files.forEach(file => {
              fs.unlink(`${dest}/${file}`, err => {
                if (err) console.log(err);
              });
            })
            fs.readdir(src, (err, files) => {
                if (err)
                    console.log(err);
                else {
                    files.forEach(file => {
                    fs.copyFile(`${src}/${file}`,`${dest}/${file}`, err => {
                    if (err) console.log(err); 
                    })
                  })
                }
            })    
        });
    }
})  
}
CopyDir(src,dest)
