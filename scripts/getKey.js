const cq = require('..');

cq.mode = 1;

cq.on('_keypress', (chunk) => {
    console.log(chunk);
});

cq.on('input', (input) => {
    if (input.endsWith('exit')) process.exit();
});