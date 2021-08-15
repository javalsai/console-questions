const events = require('events');

class console_questions extends events.EventEmitter {
    constructor() {
        if (process.config.variables.console_questions) throw new ReferenceError('"console-question has already been initialized"');
        super();
        this.defaultOptions = {
            after: '\n', // A string to put after every question
            before: '', // A string to put before every question
            limit: null, // The limit of time to answer a question in ms (if exceeded return null)
            showTyping: true, // If show what the user is typing or not

            callback: () => {} // Just a callback
        }
        this.customizedOptions = this.defaultOptions;
        this.restartOptions = () => this.customizedOptions = this.defaultOptions;

        this.mode = 1;


        // this.ask = require('./src/class/ask');
        this.setCustomizedOptions = (options) => {
            if (options.constructor !== {}.constructor) throw new TypeError('Options must be an object.');
            this.customizedOptions = Object.assign({}, this.defaultOptions, options)
            let error = console_questions.validateOptions(this.customizedOptions);
            if (error instanceof Error) throw error;
        };
        this.setMode = (mode) => {
            if (!Number.isInteger(mode)) throw new TypeError('Mode must be an integer.');
            if (mode < 0 || mode > 1) throw new RangeError('Mode integer must be between 0 and 1.');
            this.mode = mode;
            /**
             * 0: Stdin writes by itself to stdout even if there isn't a question in progress.
             * 1: Stdin don't writes by itself to stdout, questinons have to write by itselves.
             */
        };
        this.defaultDictionary = require('./src/class/dictionary');
        this.dictionary = this.defaultDictionary;
        this.restartDictionary = () => this.dictionary = this.defaultDictionary;
    }

    set(key, value) {
        this[key] = value;
    }

    static validateOptions(options) {
        if (typeof options.after !== 'string') return new TypeError('"options.after" must be a string.');
        if (typeof options.before !== 'string') return new TypeError('"options.before" must be a string.');
        if (Number.isInteger(options.limit) || options.limit !== null) return new TypeError('"options.limit" must be an integer or null.');
        if (typeof options.showWhatTyping !== 'boolean') return new TypeError('"options.showWhatTyping" must be a boolean');
        if (!options.callback instanceof Function) return new TypeError('"options.callback" must be an instance of Function');
    }
}

const _ = process.config.variables.console_questions = {
    instance: new console_questions(),
    class: console_questions,
    stdin: process.stdin || process.openStdin(),
    private: {
        emitter: new events.EventEmitter()
    }
}
require('./src/events_manager')
module.exports = _.instance;