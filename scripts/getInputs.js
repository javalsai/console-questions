const cq = require('..');

cq.mode = 0;

cq.on('input', (input) => {
    console.log('Your input is: ' + input);
    if (input.endsWith('exit')) {
        process.exit();
    }
});