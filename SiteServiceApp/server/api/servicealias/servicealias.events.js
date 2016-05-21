/**
 * Servicealias model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Servicealias = require('./servicealias.model');
var ServicealiasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ServicealiasEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Servicealias.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ServicealiasEvents.emit(event + ':' + doc._id, doc);
    ServicealiasEvents.emit(event, doc);
  }
}

module.exports = ServicealiasEvents;
