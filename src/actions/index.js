import axios from 'axios';
import { creatStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export const FETCH_LYFT_HIST = 'FETCH_LYFT_HIST';

const lyftTokenUri = 'https://api.lyft.com/oauth/token';
const lyftApiHistoryUrl = 'https://api.lyft.com/v1/rides';

function makeHistoryArray(object) {
	let lyftHistory = [];					
		for (var i=0; i<object.data.ride_history.length; i++) {	
			var lyftRideData = object.data.ride_history[i];					
			var lRd = lyftRideData;
			lyftHistory.push(lRd);
		}
	return lyftHistory;
};

function parseLyftHistory(array) {
	let lyftParsed = [];

	for (var i=0; i<array.length; i++) {
		// //if lyft cancelled
		// if (array[i].canceled_by === "driver") {
		// 	var cancelRide = {
		// 		price: array[i].price.amount,
		// 		requestedAt: array[i].requested_at,
		// 		location: array[i].origin.address,
		// 		destination: array[i].destination.address,
		// 		driver: {
		// 			name: array[i].driver.first_name,
		// 			lat: array[i].driver.lat,
		// 			lng: array[i].driver.lng,
		// 			rating: array[i].driver.rating,
		// 		},
		// 		vehicle: {
		// 			color: array[i].vehicle.color,
		// 			make: array[i].vehicle.make,
		// 			model: array[i].vehicle.model,
		// 			year: array[i].vehicle.year
		// 		},
		// 		// destination: array[i].destintion.address,
		// 		rideType: array[i].ride_type,
		// 		rideId: array[i].ride_id
		// 	};
		// 	lyftParsed.push(cancelRide);

		// } if (array[i].canceled_by === "passenger") {
		// 	var cancelRide = {
		// 		price: array[i].price.amount,
		// 		requestedAt: array[i].requested_at,
		// 		location: {
		// 			lat: array[i].origin.address.lat,
		// 			lng: array[i].origin.address.lng
		// 		},
		// 		rideType: array[i].ride_type,
		// 		rideId: ride_id
		// 	};
		// 	lyftParsed.push(cancelRide);
		// } 
		if (array[i].status==='droppedOff') {
			console.log(array[i].requested_at)
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
				pickupLat: array[i].destination.lat,
				pickupLng: array[i].destination.lnq,
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
			lyftParsed.push(historyData);
		};						
	};
	return lyftParsed
};

function allCancel(array) {
	for (var i=0; i<array.length; i++) {
		if (array[i].canceled_by) {
			lyftCancel.push(array[i])
		}
	}
}

// export function fetchLyftHist() {

// 	const lyftAccessToken = sessionStorage.getItem('lyftAccessToken')
// 	const request = axios({
// 										method: 'GET',
// 										url: lyftApiHistoryUrl+'?start_time=2015-01-01T00:00:00Z&limit=50',
// 										headers: {
// 											Authorization: 'Bearer '+ lyftAccessToken
// 										}
// 									})

// 	return { type: FETCH_LYFT_HIST, payload: request }
			
// }

export function fetchLyftHist() {
		const lyftAccessToken = sessionStorage.getItem('lyftAccessToken')
		const request = axios({
										method: 'GET',
										url: lyftApiHistoryUrl+'?start_time=2015-01-01T00:00:00Z&limit=50',
										headers: {
											Authorization: 'Bearer '+ lyftAccessToken
										}
									})

		return request.then(function(response) {
				let convertedArray = makeHistoryArray(response)
				let parsedHistory = parseLyftHistory(convertedArray)
		
				return payload(parsedHistory)
				
			});
};


function payload(request) {
	return { type: FETCH_LYFT_HIST, payload: request }
}




