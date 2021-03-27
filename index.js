const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const defaultOpts = {
    after: '\n',
    before: '',
    limit: null
};

//the default options to be customized
var customizedDefaultOptions = defaultOpts;

//the function to export
function ask(question = '', receivedOpts, receivedFunction) {
    //?const ac = new AbortController();
    //?const signal = ac.signal;
    //opts is the final options
    var finalOpts = customizedDefaultOptions;

    //function is the final function
    var finalFunction;

    //colocating everything in their site
    if (whatIsIt(receivedOpts) == 'function') {
        //ask('q', () => {})
        finalFunction = receivedOpts;
        finalOpts = customizedDefaultOptions;

    } else if (whatIsIt(receivedFunction) == 'function' && whatIsIt(receivedOpts) == 'JSON') {
        //ask('q', {}, () => {})
        finalFunction = receivedFunction;
        finalOpts = receivedOpts;

    } else if (whatIsIt(receivedOpts) == 'JSON') {
        //ask('q', {})
        finalFunction = () => { };
        finalOpts = receivedOpts;

    } else if (receivedOpts === undefined && receivedFunction === undefined) {
        //ask('q')
        finalFunction = () => { };
        finalOpts = customizedDefaultOptions;

    } else if (question === undefined) {
        //ask()
        finalOpts = customizedDefaultOptions;
        finalFunction = () => { };

    } else if (whatIsIt(question) == 'function') {
        //ask(() => {})
        finalFunction = question;
        finalOpts = customizedDefaultOptions;

    } else if (whatIsIt(question) == 'JSON' && whatIsIt(receivedOpts) == 'function') {
        //ask({}, () => {})
        finalFunction = receivedOpts;
        finalOpts = question;

    } else if (whatIsIt(question) == 'JSON') {
        //ask({})
        finalFunction = () => { };
        finalOpts = question;

    } else {
        reject('Recieved values are invalid');
    }

    //filling the not defined values in opts
    finalOpts = Object.assign({}, customizedDefaultOptions, finalOpts);

    return new Promise((resolve) => {
        //the timeout to clear when answered (opt: limit)
        //?var timeout = undefined;

        //make the question
        rl.question(finalOpts.before + question + finalOpts.after, /*//?{ signal: signal },*/ (answer) => {
            finalFunction(answer);
            resolve(answer);

            /*//?//clear everything
            if(timeout != undefined) {
                clearTimeout(timeout);
            }//? */
        });

        //if finalOpts.limit is defined and it is number:
        if (typeof finalOpts.limit == 'number') {

            //abort questions if time is exceed
            //and save it in timeout to clear it whe question answered
            //!solve abort controller inmediatly
            /* //?timeout = */setTimeout(() => {
                ac.abort();
            }, finalOpts.limit);

            //on abort
            signal.addEventListener('abort', () => {
                finalFunction(null);
                resolve(null);
            }, { once: true });
        }
    });
}


//the var to storage the functions to execute on "onConsoleInput"
var onConsoleInputFunctions = [];
function onConsoleInput(functionEvent) {
    //error if it isn't a func
    if (whatIsIt(functionEvent) != 'function') {
        throw 'The object is not a function.'
    }
    //if this is used it runs the background
    if (onConsoleInputFunctions.length == 0) {
        onConsoleInputBackground();

    } else if (onConsoleInputFunctions.length >= maxEventListeners) {
        throw 'You supered the max event listeners, change it by \"console-questions.setMaxListeners(limit)\"';
    }

    //pushing the func
    onConsoleInputFunctions.push(functionEvent);
}

//set default options
function setDefaultOptions(options) {
    customizedDefaultOptions = options;
}

//the console inputs background function
async function onConsoleInputBackground() {
    var response = await ask('', { after: '', before: '', limit: null });
    onConsoleInputFunctions.forEach((func) => { func(response); })
    onConsoleInputBackground();
}

//the set max listeners for onConsoleInput event
var maxEventListeners = 5;
function setMaxListeners(number) {
    if (number == undefined) {
        throw 'No number specified';
    } else if (typeof number != 'number') {
        throw 'Invalid number';
    }
    maxEventListeners = number;
}


//export
module.exports = {
    ask,
    onConsoleInput,
    setMaxListeners,
    setDefaultOptions,
};


//helpful functions for the code

//a function to detect var types
var JSONconstructor = ({}).constructor;
var functionConstructor = (new function () { }).constructor;
var lambdaConstructor = (() => { }).constructor;

function whatIsIt(object) {
    if (object === null) {
        return "null";
    }
    if (object === undefined) {
        return "undefined";
    }
    if (object.constructor === functionConstructor) {
        return "function";
    }
    if (object.constructor === lambdaConstructor) {
        return "function";
    }
    if (object.constructor === JSONconstructor) {
        return "JSON";
    }
    {
        return "don't know";
    }
}