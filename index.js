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

  //get data
  airlinesService.get().then((value) => {
    let airlines = value.airlines;

    tripService.get().then((value)=> {
      let flights = value.trip.flights;

      profilesService.get().then((value) => {
        let persons = value.profiles

        //outer loop to add user info to result
        for(let i = 0; i < persons.length; i++){
          result[travelers].push(
            {
              id: persons[i].personId,
              name: persons[i].name,
              flights: []
            }
          );

          //inner loop to add all flight info
          let flightArray = result[travelers][i].flights;
          for(let j = 0; j < flights.length; j++){
            if (flights[j].travelerIds.includes(persons[i].personId)) {

              //inner inner loop inserts airline name and reward number
              let leg = flights[j].legs
              for(let x = 0; x < leg.length; x++){

                let airlineRef = airlines.find(airline => airline.code === leg[x].airlineCode);
                leg[x].airlineName = airlineRef.name;
                let airReward = persons[i].rewardPrograms.air

                //this conditional is not working as expected.
                if(airlineRef.code in airReward) {
                  console.log("it rang true!")
                  leg[x].frequentFlyerNumber = airReward[airlineRef.code];
                } else {
                  leg[x].frequentFlyerNumber = '';
                }

              }
              console.log(leg);
              flightArray.push(
                {
                  legs: leg
                }

              );
            };
          };
        };
        console.log(util.inspect(result, {showHidden: false, depth: null}));
      });
    });
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
