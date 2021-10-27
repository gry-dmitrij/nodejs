const fs = require('fs');
const readline = require('readline');

const INP_PATH = './logs/access-short.log'
const OUT_PATH = './logs/logs.log'
const [,, ...args] = process.argv;

if (validate(args)) return;

const readStream = fs.createReadStream(INP_PATH, {
    encoding: 'utf-8'
});
const writeStream = fs.createWriteStream(OUT_PATH, {
    encoding: "utf-8",
});
const lineReader = readline.createInterface({
    input: readStream,
})

lineReader.on('line', (input) => {
    let contain = false;
    for (let i = 0; i < args.length; i++) {
        if (input.includes(args[i])) {
            contain = true;
            break;
        }
    }
    if (contain) {
        writeStream.write(input + '\n');
    }
})

readStream.on('error', err => {
    console.log(err);
});

writeStream.on('error', err => {
    console.log(err);
})

function validate(args) {
    if (args.length === 0) {
        console.error(new Error('Введите ip-адреса'));
        return false;
    }

    for (let i = 0; i < args.length; i++) {
        const ip = args[i];
        if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip.trim())) {
            console.error(new Error(`Неправильно введен ip-адрес: ${ip}`));
        }
        return false;
    }
    return true;
}


