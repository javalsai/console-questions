const _ = process.config.variables.console_questions;
_.stdin.setRawMode(true);
_.stdin.resume();

_.stdin.on('data', (chunk) => {
    _.instance.emit('_keypress', chunk);
});

let last_printed_length = 0;
let last_cursor_index = 0;
_.instance.on('_keypress', (chunk) => {
    let to_print = _.instance.dictionary(chunk);
    switch (_.instance.mode) {
        case 0:
            process.stdout.write('\b'.repeat(last_cursor_index) + ' \b'.repeat(last_printed_length).split('').sort().reverse().join('') + to_print.print + '\x1B[D'.repeat(to_print.print.length) + '\x1B[C'.repeat(to_print.cursor_index));
            last_printed_length = to_print.print.length;
            last_cursor_index = to_print.cursor_index;
            break;
        case 1:
            break;
    }
    if (to_print.print.endsWith('\n')) _.instance.emit('input', to_print.resolve);
});