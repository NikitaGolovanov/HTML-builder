const fs = require('fs');
const path = require('path');
var template = ''
var buffer = []

fs.exists(`${__dirname}/project-dist`, (exists) => {
    if (!exists) {
        fs.mkdir(`${__dirname}/project-dist`, (err) => {
            if (err) console.log(err);
        })
    }
})

fs.readdir(`${__dirname}/components`, (err,files) => {
    if (err) {
        console.log(err);
    }     
    else {
        const readTemplate = fs.createReadStream(`${__dirname}/template.html`,'utf-8')
        readTemplate.on('data', data => {
            template = data
        }) 
        for (let file of files) {
            if (path.extname(`${__dirname}/components/${file}`) === '.html') {
                var readHtml = fs.createReadStream(`${__dirname}/components/${file}`,'utf-8');
                readHtml.on('data',data => {
                    template = template.replace(`{{${file.split('.')[0]}}}`, data)
                
                })
            } 
        } 
        readHtml.on('end',() => {
            const writeHtml = fs.createWriteStream(`${__dirname}/project-dist/index.html`)
            writeHtml.on('error', (error) => {
                if (error) console.log(error)    
            })
            writeHtml.write(template)  
        })
    }
})

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
            const writeBundle = fs.createWriteStream(`${__dirname}/project-dist/style.css`)
            writeBundle.on('error', err => {
                if (err) console.log(err);
            })
            writeBundle.write(buffer.join('\n'))
            writeBundle.end()
        })
    }
})

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

fs.exists(`${__dirname}/project-dist/assets`, (exists) => {
    if (!exists) {
        fs.mkdir(`${__dirname}/project-dist/assets`, (err) => {
            if (err) console.log(err);
        })
    }
    fs.readdir(`${__dirname}/assets`, (err, files) => {
        if (err) console.log(err)
        for (let file of files) {
            fs.stat(`${__dirname}/assets/${file}`, (err,stat) => {
                if (err) console.log(err)
                if (stat.isDirectory()) CopyDir(`${__dirname}/assets/${file}`, `${__dirname}/project-dist/assets/${file}`)
            }) 
        }
    })
})
