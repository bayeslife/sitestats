/**
 * Siteservice model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Siteservice = require('./siteservice.model');
var SiteserviceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SiteserviceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Siteservice.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SiteserviceEvents.emit(event + ':' + doc._id, doc);
    SiteserviceEvents.emit(event, doc);
  }
}

module.exports = SiteserviceEvents;
