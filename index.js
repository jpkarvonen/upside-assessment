'use strict';

// TODO Import what you need
const airlinesService = require("./api/airlines.service.js");
const profilesService = require("./api/profiles.service.js");
const tripService = require("./api/trip.service.js");
const util = require('util');


function getTravelersFlightInfo() {
  //instantiate resulting object
  var result = {};
  var travelers = 'travelers';
  result[travelers] = [];

  //iterate over profile service object to obtain profile data
  profilesService.get().then((value) => {
    for(let i = 0; i < value.profiles.length; i++){
      result[travelers].push(
        {
          id: value.profiles[i].personId,
          name: value.profiles[i].name,
          flights: []
        });
    };
    return console.log(result);
  });
};

getTravelersFlightInfo();

//module.exports = getTravelersFlightInfo;


/*
return {
  travelers: [
    {
      id: 1,
      name: 'Neo',
      flights: [
        {
          legs: [
            {
              airlineCode: 'AA',
              airlineName: 'American',
              flightNumber: 'AA456',
              frequentFlyerNumber: ''
            }
          ]
        },
        {
          legs: [
            {
              airlineCode: 'VA',
              airlineName: 'Virgin',
              flightNumber: 'VA789',
              frequentFlyerNumber: 'NVA123'
            },
            {
              airlineCode: 'AK',
              airlineName: 'Alaskan',
              flightNumber: 'AK789',
              frequentFlyerNumber: 'NAK123'
            }
          ]
        }
      ]
    }
  ]
};
*/
