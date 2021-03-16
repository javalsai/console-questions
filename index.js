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


//the function to export a
function ask(q = '', o, f) {
    var receivedOpts;
    var opts = defaultOpts;
    var func;
    if(whatIsIt(o) == 'function') {
        func = o;
        receivedOpts = defaultOpts;
    }else if(whatIsIt(f) == 'function') {
        func = f;
        receivedOpts = o;
    }
    for(var prop in receivedOpts) {
        opts[prop] = receivedOpts[prop];
    }
    return new Promise((resolve, reject) => {
        rl.question(opts.before + q + opts.after, (answer) => {
            func(answer);
            resolve(answer);
        });
        if (typeof opts.limit == 'number') {
            setTimeout(() => {
                resolve(null);
            }, limit);
        }
    });
}

module.exports = ask;


//a function to detect var types
var JSONconstructor = ({}).constructor;
var functionConstructor = (new function() {}).constructor;
var lambdaConstructor = (() => {}).constructor;

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