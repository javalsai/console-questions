 \
What's this?
===============
***console-questions*** is a simple but easy way to request entries from console.

 \
Example usages
==============

Imagine that you want to ask for a name: 
```javascript
const console_questions = require('console-questions');

async function askForName() {
    var name = await console_questions.ask('What is your name?');
    console.log('Your name is ' + name);  //This will print the console input
}

askForName();
```

But if you don't like using `promises` you can do this:

```javascript
const console_questions = require('console-questions');

console_questions.ask('What is your name?', (name) => {
    console.log('Your name is ' + name);  //This will print the console input
});
```

 \
Other fuctions
==============
## .onConsoleInput(callback);
>This will execute the callback on every console input. \
>There is a limit of 5 callbacks, to change it only write: `console_questions.setMaxLiseners(limit)`.
```javascript
const console_questions = require('console_questions');

console_questions.onConsoleInput((input) => {
    if(input == 'Hello') {
        console.log('Hello, how are you?');
    }
});
```

## .setMaxListeners(limit)
>Change the `.onConsoleInput(callback)` callbacks limit.

## .setDefaultOptions(object)
>Change the dafault options for the code.
```javascript
const console_questions = require('console_questions');

console_questions.setDefaultOptions({after: ': '});
//You'll see the options next
```

 \
Options
=======

There are some options that you can send to the module for custome it more.
 \
 \
The way to send options it's this:
```javascript
const console_questions = require('console-questions');

console_questions.ask('What is your name?', opts, (name) => {
    console.log('Your name is ' + name);
});


// or


const console_questions = require('console-questions');

async function askForName() {
    console_questions.ask('What is your name', opts);
}

askForName();
```
The format of a options var is the next.
```javascript
var opts = {
    opt1: 'value1',
    opt2: 'value2',
    etc: 'etc'
}
```
Here are the options that you can use:
## After
>The after option allows you to put an `String` after the question, by default it's `\n`.
 \
 \
Example:
```javascript
const console_questions = require('console-questions');

async function ask() {
    var name = await console_questions.ask('Type your name: ', {
        after: ''
    });
    console.log('Your name is ' + name);
}
ask();
```


## Before
>It's just a `String` to put before.

&nbsp;

## Limit
>It's the limit of time to respond the answer, if the limit it's supered, it will return `null`, for example:

```javascript
//imagine that you want to put
// a limit for typing a word

const console_questions = require('console-questions');

async function typeFast() {
    var response = await console_questions.ask(
        'Type \"console-questions\" in less of 1 second.',
        {
            limit: 1000 /*in ms*/
        });
    if(response === null) {
        console.log('You lose')
    }else if (response == 'console-questions') {
        console.log('You win');
    }else {
        console.log('You type it wrong: ' + response);
    }
}
typeFast();
```

## There will be more options soon, good luck!!!

 \
 \
Novelties from version 1.0.2
============================
>Lots of new features added