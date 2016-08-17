const axios = require('axios');
const moment = require('moment');
const lyft = require('../keys');

const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/histories';

const db = pgp(connectionString);

let makeCall = (req, res, next) => {
	const lyftAccessToken = req.params.token;
	let parsedLyftHistory;
	const request = axios({
										method: 'GET',
										url: lyft.ApiHistoryUrl+'?start_time=2015-01-01T00:00:00Z&limit=50',
										headers: {
											Authorization: 'Bearer '+ lyftAccessToken
										}
									});
	return request
				 .then(response => {
				 	const convertedArray = convertHistoryObjToArray(response);
				 	parsedLyftHistory = parseLyftHistory(convertedArray);
				 })
				 .then(() => { res.send(parsedLyftHistory) })  
				 .then(() => { return next() });
};

let request = (startTime, lyftAccessToken) => {
	let parsedStart = moment(startTime).format();

	const a = axios({
							method: 'GET',
							url: lyft.ApiHistoryUrl+'?start_time='+parsedStart+'&limit=50',
							headers: {
								Authorization: 'Bearer '+ lyftAccessToken
							}
						});
	return a;
}

let initialHistoryPull = (req, res, next) => {
	const lyftAccessToken = req.params.token;
	const fiveMonthsAgo = moment().subtract(150, 'days')
	//xratelimit on history pulls set to 5 requests.
	let xratelimit = 5;
	let earliestRideTimeMinusOneSec;
	let parsedHistoryArray = [];
	return makeRequest(request, fiveMonthsAgo, xratelimit, lyftAccessToken, parsedHistoryArray)
	.then(() => {
		return db.any('select * from history')
		.then((data)=> {
			console.log("data length", data.length)
			res.send(200, data)
			return next();
		});
	})
	.catch(function (err) {
		return next(err);
	})
};

function getAllHistories(req, res, next) {
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
			var historyData = {
				ride_id: array[i].ride_id,
				ride_type: array[i].ride_type,
				requested_at: array[i].requested_at,
				ride_cost: array[i].price.amount,
				ride_originalcost: array[i].line_items[0].amount,
				// rideTrustServiceFee: array[i].line_items[1].amount,
				// lyftLineDiscount: array[i].line_items[2].amount,
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
				driver_image: array[i].driver_image_url,
				vehicle_make: array[i].vehicle.make,
				vehicle_model: array[i].vehicle.model,
				vehicle_year: array[i].vehicle.year,
				vehicle_color: array[i].vehicle.color,
				vehicle_license: array[i].vehicle.license_plate,
				vehicle_image: array[i].vehicle.image_url
			};
			result.push(historyData);
		};						
	};
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

function insertHistoryArray(array){
	const values = new Inserts('${ride_id}, ${ride_type}, ${requested_at}, ${ride_cost}, ${ride_originalcost}, ${origin_loc}, ${origin_lat}, ${origin_lng}, ${pickup_loc}, ${pickup_time}, ${dropoff_loc}, ${dropoff_lat}, ${dropoff_lng}, ${dropoff_time}, ${driver}, ${driver_rating}, ${driver_image}, ${vehicle_make}, ${vehicle_model}, ${vehicle_year}, ${vehicle_color}, ${vehicle_license}, ${vehicle_image}', array);

	return db.none('INSERT INTO History(ride_id, ride_type, requested_at, ride_cost, ride_originalcost, origin_loc, origin_lat, origin_lng, pickup_loc, pickup_time, dropoff_loc, dropoff_lat, dropoff_lng, dropoff_time, driver, driver_rating, driver_image, vehicle_make, vehicle_model, vehicle_year, vehicle_color, vehicle_license, vehicle_image) VALUES $1', values)
	.then(data => {
		console.log("data before return", data);
		return data;
	})
	.catch(error => {
		console.log("error", error);
	})
}

function makeRequest(action, startTime, xratelimit, lyftAccessToken, parsedHistoryArray) {
		xratelimit --;
		return action(startTime, lyftAccessToken)
		.then( response => {
			let convertedArray = convertHistoryObjToArray(response);
			let parsedLyftHistory = parseLyftHistory(convertedArray);
			parsedHistoryArray = parsedHistoryArray.concat(parsedLyftHistory);
			if (xratelimit === 0) {
				parsedHistoryArray.reverse();
				return insertHistoryArray(parsedHistoryArray);
			};
			//get earliest ride time from the parsed response
			//take the last item in array (most recent) convert the time + 1 secnd
			let lastLyftRideTime = parsedHistoryArray[parsedHistoryArray.length-1].requested_at;
			let lastLyftRideTimePlusOneSec = moment(lastLyftRideTime).add(1, 's');
			return makeRequest(action, lastLyftRideTimePlusOneSec, xratelimit, lyftAccessToken, parsedHistoryArray);
		});
}

module.exports = {
	initialHistoryPull: initialHistoryPull, 
};
