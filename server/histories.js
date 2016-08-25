const axios = require('axios');
const moment = require('moment');
const lyft = require('../keys');
const pgp = require('pg-promise')();

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/histories';

const db = pgp(connectionString);

function findAll(req, res, next) {
  return db.any('select * from history')
  .then((data) => {
    console.log('DATA', data);
    res.send(data);
    next();
  })
  .catch((error) => {
    console.log('ERROR:', error);
  })
  .then(() => {
    pgp.end();
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function convertHistoryObjToArray(object) {
  const result = [];
  for (let i = 0; i < object.data.ride_history.length; i++) {
    const lyftRideData = object.data.ride_history[i];
    result.push(lyftRideData);
  }
  return result;
}

function parseLyftHistory(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].status === 'droppedOff') {
      const historyData = {
        ride_id: array[i].ride_id,
        ride_type: array[i].ride_type,
        requested_at: array[i].requested_at,
        ride_cost: array[i].price.amount,
        ride_originalcost: array[i].line_items[0].amount,
        origin_loc: array[i].origin.address,
        origin_lat: array[i].origin.lat,
        origin_lng: array[i].origin.lng,
        pickup_loc: array[i].pickup.address,
        pickup_time: array[i].pickup.time,
        dropoff_loc: array[i].dropoff.address,
        dropoff_lat: array[i].dropoff.lat,
        dropoff_lng: array[i].dropoff.lng,
        dropoff_time: array[i].dropoff.time,
        driver: array[i].driver.first_name,
        driver_rating: array[i].driver.rating,
        driver_image: array[i].driver.image_url,
        vehicle_make: array[i].vehicle.make,
        vehicle_model: array[i].vehicle.model,
        vehicle_year: array[i].vehicle.year,
        vehicle_color: array[i].vehicle.color,
        vehicle_license: array[i].vehicle.license_plate,
        vehicle_image: array[i].vehicle.image_url,
      };
      result.push(historyData);
    }
  }
  return result;
}

function Inserts(template, data) {
    if (!(this instanceof Inserts)) {
        return new Inserts(template, data);
    }
    this._rawDBType = true;
    this.formatDBType = function () {
        return data.map(d=>'(' + pgp.as.format(template, d) + ')').join();
    };
}

function insertHistoryArray(array) {
  const values = new Inserts('${ride_id}, ${ride_type}, ${requested_at}, ${ride_cost}, ${ride_originalcost}, ${origin_loc}, ${origin_lat}, ${origin_lng}, ${pickup_loc}, ${pickup_time}, ${dropoff_loc}, ${dropoff_lat}, ${dropoff_lng}, ${dropoff_time}, ${driver}, ${driver_rating}, ${driver_image}, ${vehicle_make}, ${vehicle_model}, ${vehicle_year}, ${vehicle_color}, ${vehicle_license}, ${vehicle_image}', array);

  return db.none('INSERT INTO history(ride_id, ride_type, requested_at, ride_cost, ride_originalcost, origin_loc, origin_lat, origin_lng, pickup_loc, pickup_time, dropoff_loc, dropoff_lat, dropoff_lng, dropoff_time, driver, driver_rating, driver_image, vehicle_make, vehicle_model, vehicle_year, vehicle_color, vehicle_license, vehicle_image) VALUES $1', values)
  .then(() => {
    console.log(array.length, ' :records inserted');
    return;
  })
  .catch(error => {
    console.log("error", error);
  });
}

function request(startTime, lyftAccessToken) {
  const parsedStart = moment(startTime).format();
  const query = axios({
                  method: 'GET',
                  url: lyft.ApiHistoryUrl + '?start_time=' + parsedStart + '&limit=50',
                  headers: {
                  Authorization: 'Bearer ' + lyftAccessToken
                  }
                });
  return query;
}

function makeRequest(action, startTime, lyftAccessToken, historySoFar, xratelimit, ms) {
  let time = ms;
  console.log("delay:", time)
  return delay(time)
  .then(()=> {
    return action(startTime, lyftAccessToken)
    .then(response => {
      let convertedHistoryArray = convertHistoryObjToArray(response);
      let parsedHistoryArray = parseLyftHistory(convertedHistoryArray);
      console.log("F", parsedHistoryArray[parsedHistoryArray.length-1].dropoff_time, "L", parsedHistoryArray[0].dropoff_time)
      let parsedLyftHistory = historySoFar.concat(parsedHistoryArray); 
      //if the query gives less than max results or parsedHistoryArray is empty 
      if (convertedHistoryArray.length < 50 || parsedHistoryArray.length === 0) {
        return insertHistoryArray(parsedLyftHistory);
      }
      let limit = xratelimit;
      limit--;
      //reset delay time
      time = 0;
      //if we hit the rate limiter delay by 30kms and reset limit counter
      if (limit <= 0) {
        time = 30000;
        limit = 5;
        console.log("hit limit - taking a break");
      }  
      let mostRecentDate = parsedHistoryArray[parsedHistoryArray.length-1].dropoff_time 
      return makeRequest(action, mostRecentDate, lyftAccessToken, parsedLyftHistory, limit, time)
    })
  })
}

function pullCompleteHistory(lyftAccessToken) {
  const earliestDate = '2015-01-01T00:00:00Z';
  const completeHistory = [];
  let limit = 5;
  let token = lyftAccessToken;
  let ms = 0;

  return makeRequest(request, earliestDate, token, completeHistory, limit, ms);
}

function setLyftAccessToken(req, res, next) {
  const lyftAccessToken = req.params.token;
  return pullCompleteHistory(lyftAccessToken)
  .then(() => {
    res.send(200, 'Got token');
    next();
  });
}


function findById(req, res, next) {
  const rideId = req.params.id;
  return db.any('select * from history where ride_id=${rideId}')
  .then((data) => {
    console.log('${rideId}', data);
    res.send(data);
    next();
  })
  .catch((error) => {
    console.log('ERROR:', error);
  })
  .then(() => {
    pgp.end();
  });
}

module.exports = {
  findAll,
  setLyftAccessToken,
  findById,
};
