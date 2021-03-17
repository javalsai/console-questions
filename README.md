 \
What's this?
===============
***console-questions*** is a simple but easy way to request entries from console.

 \
Example usages
==============

Imagine that you want to ask for a name: 
```javascript
const ask = require('console-questions');

async function askForName() {
    var name = await ask('What is your name?');
    console.log('Your name is ' + name);  //This will print the console input
}

askForName();
```

But if you don't like using `promises` you can do this:

```javascript
const ask = require('console-questions');

ask('What is your name?', (name) => {
    console.log('Your name is ' + name);  //This will print the console input
});
```

 \
Options
=======

There are some options that you can send to the module for custome it more.
 \
 \
The way to send options it's this:
```javascript
const ask = require('console-questions');
ask('What is your name?', opts, (name) => {
    console.log('Your name is ' + name);
});
// or
async function askForName() {
    ask('What is your name', opts);
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
const ask = require('console-questions');

async function ask() {
    var name = await ask('Type your name: ', {
        after: ''
    });
    console.log('Your name is ' + name);
}
```


## Before
>It's just a `String` to put before.

&nbsp;

## Limit
>It's the limit of time to respond the answer, if the limit it's supered, it will return `null`, for example:

```javascript
//imagine that you want to put
// a limit for typing a word

const ask = require('console-questions');

async function typeFast() {
    var response = await ask(
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
>**Lots** of bugs fixed.