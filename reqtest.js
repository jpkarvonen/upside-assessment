'use strict';

// TODO Import what you need
const airlinesService = require("./api/airlines.service.js");
const profilesService = require("./api/profiles.service.js");
const tripService = require("./api/trip.service.js");
const util = require('util');


tripService.get().then(function(value) {
  console.log(util.inspect(value, {showHidden: false, depth: null}));
});

profilesService.get().then(function(value) {
  console.log(util.inspect(value.profiles[1].personId, {showHidden: false, depth: null}));
});

airlinesService.get().then(function(value) {
  console.log(util.inspect(value, {showHidden: false, depth: null}));
});
