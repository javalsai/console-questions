const emiter = new(class console_questions extends require('events').EventEmitter {
    constructor() {
        super();
        this.ask = ask;
        this.setDefaultOptions = setDefaultOptions;
        this.getDefaultOptions = getDefaultOptions;
        this.getCustomizedOptions = getCustomizedOptions;
        this.restartOptions = restartOptions;
        this.ctrlCToExit = ctrlCToExit;
    }
});
const defaultOpts = {
    after: '\n',
    before: '',
    limit: null,
    showTyping: true,

    callback: () => {},
};
var ctrlC = true;
const stdin = process.openStdin();
//the default options to be customized
var customizedDefaultOptions = defaultOpts;

//the function to export
var showingTyping = false;

function ask(question, receivedOpts = customizedDefaultOptions) {
    return new Promise((resolve, reject) => {
        if (receivedOpts.constructor !== {}.constructor) reject(new Error('Options have to be an object')); // options isn't an object ({})
        var opts = Object.assign({}, customizedDefaultOptions, receivedOpts); // assign optins to opts

        //the timeout to clear when answered (opt: limit)

        //make the question 
        process.stdout.write(opts.before + String(question) + opts.after);

        //making the string
        var string = '';
        var showingTypingHere = showingTyping ? false : opts.showTyping;
        showingTyping = showingTyping ? true : showingTypingHere;

        async function onPress(chunk) {
            if (chunk.codePointAt() === 27) return; // Yhis means that the user pressed some arrow, it has a very strange behavior (you can try to delete this line and try it).
            if (opts.showTyping && (showingTyping && showingTypingHere)) {
                process.stdout.write(chunk === '\b' ? '\b \b' : chunk);
                showingTyping = true;
                showingTypingHere = true;
            }

            // enter
            if (chunk.codePointAt() === 13) {
                await sleep(0);
                if (timeout) clearTimeout(timeout);
                opts.callback(string);
                emiter.removeListener('keypress', onPress);
                resolve(string);
                showingTyping = false;
                return;
            }

            // backspace
            else if (chunk.codePointAt() === 8) {
                string = string.slice(0, -1);
            } else {
                string += chunk;
            }

        }
        emiter.addListener('keypress', onPress);

        var timeout;
        //if opts.limit is defined and it is number:
        if ((typeof opts.limit) == 'number') {
            //abort questions if time is exceed
            //and save it in timeout to clear it whe question answered
            if (opts.limit !== undefined && opts.limit !== null) {
                timeout = setTimeout(() => {
                    opts.callback(null);
                    resolve(null);
                    emiter.removeListener('keypress', onPress);
                    showingTyping = false;
                }, opts.limit);
            }
        } else if (opts.limit !== undefined && opts.limit !== null) {
            reject(new Error('options.limit isn\'t a number, undefined or null'));
        }
    });
}

async function background() {
    const response = await ask('', { showTyping: false });
    emiter.emit('input', response);
    background();
}
background();

//the var to storage the functions to execute on "onConsoleInput"


//set default options
function setDefaultOptions(options) {
    return Object.assign(customizedDefaultOptions, options);
}

function getDefaultOptions() {
    return defaultOpts;
}

function getCustomizedOptions() {
    return customizedDefaultOptions;
}

function restartOptions() {
    return setDefaultOptions(getDefaultOptions());
}

function ctrlCToExit(bool = true) {
    return ctrlC = bool;
}


stdin.setRawMode(true);
stdin.resume();

function onPress(chunk) {
    if (String(chunk).codePointAt() === 3 && ctrlC) {
        process.exit(0);
    }
    emiter.emit('keypress', String(chunk));
}
stdin.addListener('data', onPress);

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}


//export
module.exports = emiter;