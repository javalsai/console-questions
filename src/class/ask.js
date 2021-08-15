let global_showTyping = false;

function ask(q = '', raw_options = _.instance.customizedOptions) {
    const _ = process.config.variables.console_questions;
    if (raw_options.constructor !== {}.constructor) throw new TypeError('Options must be an object.');
    let options = Object.assign({}, _.instance.customizedOptions, raw_options);
    let optionsError = _.class.validateOptions(options);
    if (optionsError instanceof Error) throw optionsError;

    process.stdout.write(options.before + String(q) + options.after);

    options.showTyping = global_showTyping ? false : options.showTyping;
    global_showTyping = global_showTyping ? true : options.showTyping;
    return new Promise(resolve => {
        // Typing show or not
        let final_mode = _.instance.mode;
        _.instance.setMode(Number(!options.showTyping));

        function onModeChange(mode) {
            final_mode = mode;
        }
        _.instance.on('mode_change', onModeChange);

        // Input
        function onceInput(input) {
            if (timeout) clearTimeout(timeout);
            global_showTyping = false;
            _.instance.setMode(final_mode);
            options.callback(input);
            resolve(input);
        }
        _.instance.once('input', onceInput);

        // Limit time
        let timeout;
        if (typeof options.limit == 'number' || typeof options.limit == 'bigint') {
            timeout = setTimeout(() => {
                _.instance.removeListener('input', onceInput);
                global_showTyping = false;
                _.instance.setMode(final_mode);
                options.callback(null);
                resolve(null);
            }, options.limit);
        }

    });
}
module.exports = ask;