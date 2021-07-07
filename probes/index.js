//./../../ask/index
//console-questions

const cq = require('./../');

cq.ask(`What's your name?`, {
    callback: (response) => {
        console.log(`Ok, welcome ` + response);
    },
});