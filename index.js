const emiter = new (class extends require('events').EventEmitter {
    constructor() {
        super();
        this.ask = ask;
        this.setDefaultOptions = setDefaultOptions;
        this.getDefaultOptions = getDefaultOptions;
        this.getCustomizedOptions = getCustomizedOptions;
        this.restartOptions = restartOptions;
    }
});
const defaultOpts = {
    after: '\n',
    before: '',
    limit: undefined,

    callback: () => { },
};
const stdin = process.openStdin();
//the default options to be customized
var customizedDefaultOptions = defaultOpts;

//the function to export
function ask(question, receivedOpts = {}) {
    return new Promise((resolve, reject) => {

        if (receivedOpts.constructor !== {}.constructor) reject(new Error('Options have to be an object')); // options isn't an object ({})
        var opts = Object.assign({}, customizedDefaultOptions, receivedOpts); // assign optins to opts

        //the timeout to clear when answered (opt: limit)

        //make the question 
        process.stdout.write(opts.before + String(question) + opts.after);

        //making the string
        var string = '';
        function onPress(chunk, key) {
            console.log(chunk);
            if (key.sequence === '\r') {
                if (timeout) clearTimeout(timeout);
                opts.callback(string);
                stdin.removeListener(onPress);
                resolve(string);
                return;
            }
            string += key.sequence;
        }

        stdin.addListener('data', onPress);
        stdin.addListener('data', c => {console.log(c)});



        var timeout = undefined;
        //if opts.limit is defined and it is number:
        if ((typeof opts.limit) == 'number') {
            //abort questions if time is exceed
            //and save it in timeout to clear it whe question answered
            timeout = setTimeout(() => {
                opts.callback(null);
                resolve(null);
                stdin.removeListener(onPress);
            }, opts.limit);
        } else if (opts.limit !== undefined) {
            reject(new Error('options.limit isn\'t a number'));
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
    Object.assign(customizedDefaultOptions, options);
    return options;
}

function getDefaultOptions() {
    return defaultOpts;
}
function getCustomizedOptions() {
    return customizedDefaultOptions;
}
function restartOptions() {
    setDefaultOptions(getDefaultOptions());
}


//export
module.exports = emiter;
ask('a').then(a => console.log(a));