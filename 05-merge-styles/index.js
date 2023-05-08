const fs = require('fs');
const path = require('path');
var buffer = [];

fs.readdir(`${__dirname}/styles`, (err,files) => {
    if (err) {
        console.log(err);
    }     
    else {
        for (let file of files) {
            if (path.extname(`${__dirname}/styles/${file}`) === '.css') {
                var readCss = fs.createReadStream(`${__dirname}/styles/${file}`,'utf-8');
                readCss.on('data',data => {
                buffer.push(data)
                })
            } 
        }
        readCss.on('end',() => {
            const writeBundle = fs.createWriteStream(`${__dirname}/project-dist/bundle.css`)
            writeBundle.on('error', err => {
                if (err) console.log(err);
            })
            writeBundle.write(buffer.join('\n'))
            writeBundle.end()
        })
    }
})
