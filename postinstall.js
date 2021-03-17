const console_questions = require('console-questions');

console.log('\nThanks for installing console-questions.\nDo you want to show you a small tutorial?');
async function main() {
    var response = await console_questions.ask('(y/n)', {after: ': '});
    if(response.trim().toLowerCase() == 'y') {
        console.log('ok');
        tutorial();
    }else if(response.trim().toLowerCase() == 'n') {
        console.log('ok');
        process.exit();
    }else {
        console.log('I didn\'t understand you, I\'ll repeat.\n');
        setTimeout(() => {
            main();
        }, 400);
    }
}main();

async function tutorial() {
    console.log('\n\nI\'ll supose that in all the codes I\'m going to show in this tutorial, everyone has \"const console_questions = require(\\\'console-questions\\\');"');
    await sleep(1000);
    console.log('\nTo make a simple question only write \"console_questions.ask(\\\'What\\\'s your name?\\\');\"\nThe result will be like this:\n');
    await console_questions.ask('What\'s your name?');
    console.log('\nIf you want to storage the response in a variable just copy the next code in a async function: \"var response = await console_questions.ask(\\\'What\\\'s your name?\\\');\"');
    console.log('And then you can do \"console.log(\\\'Your name is: \\\' + response);\"')
    var response = await console_questions.ask('What\'s your name?');
    console.log('Your name is: ' + response);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}