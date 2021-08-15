const cq = require('..');

cq.mode = 1;

cq.on('_keypress', (buffer) => {
    console.log('_keypress', buffer);
});

cq.on('keypress', (string) => {
    console.log('keypress', string);
});

cq.on('input', (input) => {
    if (input.endsWith('exit')) process.exit();
});