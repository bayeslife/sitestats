/**
 * Stat model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Stat = require('./stat.model');
var StatEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StatEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Stat.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StatEvents.emit(event + ':' + doc._id, doc);
    StatEvents.emit(event, doc);
  }
}

module.exports = StatEvents;
