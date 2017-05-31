var EventEmitter = require('events').EventEmitter

// singletone event object
export const event = new EventEmitter();

event.setMaxListeners(512)
