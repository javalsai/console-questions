const cq = require('..');
process.stdout.write('\nPresss "F2": ');
cq.setMode(1);
cq.once('_keypress', (buffer) => {
    pass(Buffer.compare(buffer, Buffer.from([0x1b, 0x5b, 0x5b, 0x42])) === 0, '_keypress');
    process.stdout.write('\nPress "a" (shouldn\'t appear): ');
    cq.once('keypress', (key) => {
        pass(key === 'a', 'keypress hide');
        cq.setMode(0);
        process.stdout.write('\nPress "a" (should appear): ');
        cq.once('keypress', (key) => {
            pass(key === 'a', 'keypress show');
            cq.setMode(1);
            process.stdout.write('\nWrite "soM?<F2>" (shouldn\'t appear)');
            cq.once('input', (input) => {
                pass(input === 'aasoM?', 'input'); //double 'a' is for before 'a' keypress
                questions();
            });
        });
    });
});

async function questions() {
    const r1 = await cq.ask('\nWrite whatever you want (use arrows, del...) that the result is "test" (also try to delete this question):', { after: '' });
    pass(r1 === 'test', 'Question');
    const r2 = await cq.ask('Timed out question:', { limit: 0 });
    pass(r2 === null, 'Timed-out question');
    const r3 = await cq.ask('Write "something" (fast).', { limit: 9999999 });
    pass(r3 === 'something', 'Non-timed-out question');
    const r4 = await cq.ask('Write "test" (shouldn\'t appear)', { showTyping: false });
    pass(r4 === 'test', 'Unshow question');
    process.exit();
}


let tests = {};
let unknowns = 0;

function pass(bool, name = 'unknown' + unknowns) {
    const str = bool === '?' ? '\x1B[1m\x1B[38;2;255;119;0mCHECK\x1B[39m\x1B[22m' : (bool ? '\x1B[1m\x1B[32mPASS\x1B[39m\x1B[22m' : '\x1B[1m\x1B[31mFAIL\x1B[39m\x1B[22m');
    if (!arguments[1]) unknowns++;
    tests[name] = str;
}

process.on('exit', code => {
    console.log('\n\nTESTS RESULTS:');
    for (var name in tests) console.log(`    ${name}: ${tests[name]}`);
    console.log('\x1B[1m\x1B[38;2;255;119;0m\x1B[39m\x1B[22m\n\x1B[1m\x1B[38;2;255;119;0mNOTE: This results aren\'t 100% true, you should check every test\x1B[39m\x1B[22m\n\x1B[1m\x1B[38;2;255;119;0m\x1B[39m\x1B[22m\n\x1B[1m\x1B[38;2;255;119;0m\x1B[39m\x1B[22m');
    if (code !== 0) { console.log('\x1B[1m\x1B[31mTESTS FAILED, CRITICAL ERROR\x1B[39m\x1B[22m') }
});

cq.on('_keypress', (buffer) => {
    if (buffer[0] === 0x03) process.exit();
});