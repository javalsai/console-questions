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
var constomizedDefaultOptions = defaultOpts;

//the function to export
function ask(question = '', receivedOpts, receivedFunction) {
    //opts is the final options
    var finalOpts = constomizedDefaultOptions;

    //a var for working later
    var opts;

    //function is the final function
    var finalFunction;

    //colocating everything in their site
    if (whatIsIt(receivedOpts) == 'function') {
        //ask('q', () => {})
        finalFunction = receivedOpts;
        opts = constomizedDefaultOptions;

    } else if (whatIsIt(receivedFunction) == 'function' && whatIsIt(receivedOpts) == 'JSON') {
        //ask('q', {}, () => {})
        finalFunction = receivedFunction;
        opts = receivedOpts;

    } else if (whatIsIt(receivedOpts) == 'JSON') {
        //ask('q', {})
        finalFunction = () => { };
        opts = receivedOpts;

    } else if (receivedOpts === undefined && receivedFunction === undefined) {
        //ask('q')
        finalFunction = () => { };
        opts = constomizedDefaultOptions;

    } else if (question === undefined) {
        //ask()
        opts = constomizedDefaultOptions;
        finalFunction = () => { };

    } else if (whatIsIt(question) == 'function') {
        //ask(() => {})
        finalFunction = question;
        opts = constomizedDefaultOptions;

    } else if (whatIsIt(question) == 'JSON' && whatIsIt(receivedOpts) == 'function') {
        //ask({}, () => {})
        finalFunction = receivedOpts;
        opts = question;

    } else if (whatIsIt(question) == 'JSON') {
        //ask({})
        finalFunction = () => { };
        opts = question;

    } else {
        reject('Recieved values are invalid');
    }

    //filling the not defined values in opts
    for (var property in opts) {
        finalOpts[property] = opts[property];
    }

    return new Promise((resolve, reject) => {
        //make the question
        rl.question(finalOpts.before + question + finalOpts.after, (answer) => {
            finalFunction(answer);
            resolve(answer);
        });

        //if finalOpts.limit is defined and its number:
        if (typeof finalOpts.limit == 'number') {
            setTimeout(() => {
                finalFunction(null);
                resolve(null);
            }, finalOpts.limit);
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
    constomizedDefaultOptions = options;
}

//the console inputs background function
async function onConsoleInputBackground() {
    var response = await ask('', { after: '', before: '', limit: null });
    onConsoleInputFunctions.forEach((func) => { func(response); })
    onConsoleInputBackground();
}

//the set max listeners for onConsoleInput event
var maxEventListeners = 5;
function maxListeners(number) {
    if (number == undefined) {
        throw 'No number specified';
    } else if (typeof number != 'number') {
        throw 'Invalid number';
    }
    maxEventListeners = number;
}


//export
module.exports = {
    ask: ask,
    onConsoleInput: onConsoleInput,
    setMaxLiseners: maxListeners,
    setDefaultOptions: setDefaultOptions
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