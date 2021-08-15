const _ = process.config.variables.console_questions;
_.stdin.setRawMode(true);
_.stdin.resume();

_.stdin.on('data', (chunk) => {
    _.instance.emit('_keypress', chunk);
});

let last_printed_length = 0;
_.instance.on('_keypress', (chunk) => {
    let to_print = _.instance.dictionary(chunk);
    switch (_.instance.mode) {
        case 0:
            process.stdout.write('\b \b'.repeat(last_printed_length) + to_print.print);
            last_printed_length = to_print.print.length;
            break;
        case 1:
            break;
    }
    if (to_print.print.endsWith('\n')) _.instance.emit('input', to_print.resolve);
});