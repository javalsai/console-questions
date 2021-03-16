const { resolve } = require('path');
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


//the function to export
function ask(question = '', receivedOpts, receivedFunction) {
    //opts is the final options
    var finalOpts = defaultOpts;

    //a var for working later
    var opts;

    //function is the final function
    var finalFunction;

    //colocating everything in their site
    if (whatIsIt(receivedOpts) == 'function') {
        //ask('q', () => {})
        finalFunction = receivedOpts;
        opts = defaultOpts;

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
        opts = defaultOpts;

    } else if (question === undefined) {
        //ask()
        opts = defaultOpts;
        finalFunction = () => { };

    } else if (whatIsIt(question) == 'function') {
        //ask(() => {})
        finalFunction = question;
        opts = defaultOpts;

    } else if (whatIsIt(question) == 'JSON' && whatIsIt(receivedOpts) == 'function') {
        //ask({}, () => {})
        finalFunction = receivedOpts;
        opts = question;

    } else if (whatIsIt(question) == 'JSON') {
        //ask({})
        finalFunction = () => { };
        opts = question;

    } else {
        resolve(new Error('Recieved values are not valid'));
    }

    //filling the not defined values in opts
    for (var property in opts) {
        finalOpts[property] = opts[property];
    }

    return new Promise((resolve, reject) => {
        rl.question(finalOpts.before + question + finalOpts.after, (answer) => {
            finalFunction(answer);
            resolve(answer);
        });
        if (typeof finalOpts.limit == 'number') {
            setTimeout(() => {
                finalFunction(null);
                resolve(null);
            }, finalOpts.limit);
        }
    });
}

module.exports = ask;


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