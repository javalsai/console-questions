const events = require('events');
const emiter = new events.EventEmitter();
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const defaultOpts = {
    after: '\n',
    before: '',
    limit: null,


    callback: () => { },
};

//the default options to be customized
var customizedDefaultOptions = defaultOpts;

//the function to export
function ask(question, receivedOpts = {}) {

    if(receivedOpts.constructor !== {}.constructor) throw new Error('Options has to be an object');
    var opts = Object.assign({}, customizedDefaultOptions, receivedOpts);

    return new Promise((resolve) => {
        //the timeout to clear when answered (opt: limit)

        //make the question
        var finished = false;
        rl.question(opts.before + question + opts.after, (answer) => {
            if (!finished) {
                opts.callback(answer);
                resolve(answer);
                finished = true;
            }
        });

        //if opts.limit is defined and it is number:
        if (typeof opts.limit == 'number') {
            //abort questions if time is exceed
            //and save it in timeout to clear it whe question answered
            setTimeout(() => {
                if (!finished) {
                    opts.callback(null);
                    resolve(null);
                    finished = true;
                }
            }, opts.limit);
        }
    });
}

async function background() {
    const response = await ask();
    emiter.emit('input', response);
    background();
}
background();

//the var to storage the functions to execute on "onConsoleInput"


//set default options
function setDefaultOptions(options) {
    customizedDefaultOptions = options;
}


//export
module.exports = {
    ask,
    emiter: emiter,
    setDefaultOptions,
};