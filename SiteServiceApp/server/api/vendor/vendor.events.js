/**
 * Vendor model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Vendor = require('./vendor.model');
var VendorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VendorEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Vendor.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VendorEvents.emit(event + ':' + doc._id, doc);
    VendorEvents.emit(event, doc);
  }
}

module.exports = VendorEvents;
