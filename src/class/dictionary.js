let data = [];
let cursor_index = 0;
module.exports = function disctionary(buffer = Buffer.alloc(0)) {
    // Enter
    if (buffer[0] == 0x0d) {
        cursor_index = 0;
        return {
            print: data.join('') + '\n',
            resolve: data.join(''),
            _: (() => data = [])()
        };
    }

    // Simple `toString` characters
    if (
        /* Basic characters ' ', {, +, a, A, 0...} */
        (buffer[0] >= 0x20 && buffer[0] <= 0x7e) ||
        /* Special characters:  , ¿, ç... (' '-¿) */
        buffer[0] == 0xc2 && (buffer[1] <= 0xbf && buffer[1] >= 0xa0) ||
        /* Very special characters: ñ, á, Ð, à, ÿ... (À-ÿ) */
        buffer[0] == 0xc3 && (buffer[1] <= 0xbf && buffer[1] >= 0x80)
    ) {
        data = data.slice(0, cursor_index).concat(buffer.toString().split(''), data.slice(cursor_index));
        cursor_index += buffer.toString().split('').length;
    }

    // Backspace
    else if (buffer[0] === 0x08) {
        data = data.slice(0, cursor_index - 1).concat(data.slice(cursor_index));
        cursor_index--;
    }

    // Arrow keys (left & right)
    else if (buffer[0] === 0x1b && buffer[1] === 0x5b && (buffer[2] === 0x43 || buffer[2] === 0x44)) {
        buffer[2] === 0x43 ? (cursor_index !== data.join('').length ? cursor_index++ : null) : (cursor_index !== 0 ? cursor_index-- : null);
    }

    return {
        print: data.join('') + '\x1B[D'.repeat(data.join('').length) + '\x1B[C'.repeat(cursor_index),
        resolve: data.join('')
    };
}