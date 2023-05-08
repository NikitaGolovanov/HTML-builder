const fs = require('fs');
const readline = require('readline');
const write = fs.createWriteStream('./02-write-file/text.txt')

write.on ('error', (error) => {
    console.log(error)
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter a sentence: '
});

rl.prompt();

rl.on ('line', (line) => {
    switch (line.trim()) {
        case 'exit':
            console.log('Have a nice day');
            process.exit();
        default:
            sentence = line + '\n'
            write.write(sentence);
            rl.prompt();    
    }
}).on('SIGINT', () => {
    console.log('\n Have a nice day');
    process.exit();
})