let axios = require('axios');

const lyftClientId = '76w9JwuMxobz';
const lyftClientSecret = '0dHw3FIhpOGVc4Bv7agROzU46uSi8O5p';
const lyftTokenUri = 'https://api.lyft.com/oauth/token';
const lyftApiHistoryUrl = 'https://api.lyft.com/v1/rides';

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
				rideCost: array[i].price.amount,
				rideOriginalCost: array[i].line_items[0].amount,
				// rideTrustServiceFee: array[i].line_items[1].amount,
				// lyftLineDiscount: array[i].line_items[2].amount,
				originLoc: array[i].origin.address,
				originLat: array[i].origin.lat,
				originLng: array[i].origin.lng,
				pickupLoc: array[i].pickup.address,
				// pickupLat: array[i].destination.lat,
				// pickupLng: array[i].destination.lng,
				pickupTime: array[i].pickup.time,
				dropoff: {
					loc: array[i].dropoff.address,
					lat: array[i].dropoff.lat,
					lng: array[i].dropoff.lng,
					time: array[i].dropoff.time,
					driver: array[i].driver.first_name,
				},	
				vehicle: {
					vehicleMake: array[i].vehicle.make,
					vehicleModel: array[i].vehicle.model,
					vehicleYear: array[i].vehicle.year
				}
			};
			result.push(historyData);
		};						
	};
	return result;
}

let makeCall = (req, res, next) => {
	const lyftAccessToken = req.params.token;	
	let parsedLyftHistory;
	const request = axios({
										method: 'GET',
										url: lyftApiHistoryUrl+'?start_time=2015-01-01T00:00:00Z&limit=50',
										headers: {
											Authorization: 'Bearer '+ lyftAccessToken
										}
									});
	return request
				 .then( response => { 
				 	// console.log(response) 
				 	const convertedArray = convertHistoryObjToArray(response);
				 	parsedLyftHistory = parseLyftHistory(convertedArray);
				 })
				 .then( () => { res.send(parsedLyftHistory) })  
				 .then( () => { return next()})
};

exports.makeCall = makeCall;
