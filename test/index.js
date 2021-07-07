const cq = require('../');

cq.ask(`What's your name?`, {
    callback: (response) => {
        console.log(`Ok, hello ${response}`);
    }
});