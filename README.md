console-questions
=================

`console-questions` is a simple way to make questions on the console.
\
\
![logo](https://cq-storage.javalsai9199.repl.co/docs/1.1.0/rounded-banner.png)



Instalation
===========
* ## From **[npm](https://www.npmjs.com/package/console-questions)**:
  ```
  npm install console-questions
  ```
* ## From **[GitHub](https://github.com/javalsai/console-questions)**:
  ```
  npm install https://github.com/javalsai/console-questions
  ```


Code Sample
===========


Just as simple as that.





Structure
=========

The returned module is a [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) overwritten.

\{

* [ask](#ask-question-string-options-object): `[Function: ask]`,
* [setDefaultOptions](#setdefaultoptions-options): `[Function: setDefaultOptions]`
* [getDefaultOptions](#getdefaultoptions-): `[Function: getDefaultOptions]`
* [getCustomizedOptions](#getcustomizedoptions-): `[Function: getCustomizedOptions]`
* [restartOptions](#restartoptions-): `[Function: restartOptions]`

}






Options
=======
This are the default options used in the module.

```javascript
{
    after: '\n', // A string to put after every question
    before: '',  // A string to put before every question
    limit: null, // The limit of time to answer a question in ms (if exceeded return null)
    showTyping: true, // If show what the user is typing or not

    callback: () => {} // Just a callback
}
```





Functions
=========

`ask (question: String, options: Object)`
-----------------------------------------
* Return value: `Promise`
* Arguments: 
  * `String` (the question)
  * `Object` the [options](#options).
* Resolved value: `String` (the user response for the question).

// The options will be assigned with [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to the [default options](#options).

---

`setDefaultOptions (options)`
-----------------------------
* Return value: options (the argument).
* Argumets:
  * `Object`: [Options](#options)

// Set the default options instead of using the [default options](#options).

---

`getDefaultOptions ()`
----------------------
* Return value: The [default options](#options).
* Arguments: None.

// IMPORTANT: Returns the [default options](#options), not your [customized default options](#setdefaultoptions-options).

---

`getCustomizedOptions ()`
-------------------------
* Return value: Your [customized default options](#setdefaultoptions-options).
* Arguments: None.

// IMPORTANT: Returns your [customized default options](#setdefaultoptions-options) not the [default options](#options).

---

`restartOptions ()`
-------------------
* Return value: The [default options](#options).
* Arguments: None.

// This restart your [customized default options](#setdefaultoptions-options) to the [default options](#options).

---


Events
======
`"keypress"`
------------

Emited when a key is pressed.
```javascript
const cq = require('console-questions');

cq.on('keypress', key => {
    console.log('You pressed: ' + key);
});
```
---

`"input"`
---------

Emited when the user press `Enter`.
```javascript
const cq = require('console-questions');

    console.log('You written: \n' + sentence);
});
```
---






Other
=====

* Go to the main page at [npm](https://www.npmjs.com/package/console-questions) of this package.
