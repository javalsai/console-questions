const _ = process.config.variables.console_questions;

let global_showTyping = false;

function ask(q = '', raw_options = _.instance.customizedOptions) {
    if (options.constructor !== {}.constructor) throw new TypeError('Options must be an object.');
    let options = Object.assign({}, customizedDefaultOptions, raw_options);
    let optionsError = _.class.validateOptions(options);
    if (optionsError instanceof Error) throw optionsError;

    process.stdout.write(options.before + String(q) + options.after);

    options.showTyping = global_showTyping ? false : options.showTyping;
    global_showTyping = global_showTyping ? true : options.showTyping;
    return new Promise(resolve => {
        function onceInput(input) {
            if (timeout) clearTimeout(timeout);
            global_showTyping = false;
            options.callback(string);
            resolve(string);
        }
        _.instance.once('input', onceInput);

        let timeout;
        if ((typeof opts.limit) == 'number') {
            if (opts.limit !== null) {
                timeout = setTimeout(() => {
                    emiter.removeListener('keypress', onceInput);
                    global_showTyping = false;
                    opts.callback(null);
                    resolve(null);
                }, options.limit);
            }
        }
    });
}
module.exports = ask;