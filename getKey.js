const cq = require('.');

cq.on('keypress', (key) => {
    console.log(`${key}: ${key.codePointAt()}`);
});