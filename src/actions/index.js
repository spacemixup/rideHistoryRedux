import axios from 'axios';
import { creatStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export const FETCH_LYFT_HISTORY = 'FETCH_LYFT_HISTORY';
export const SELECT_HISTORY = 'SELECT_HISTORY';

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
		
		if (array[i].status==='droppedOff') {
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


export function fetchLyftHistory() {
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
		
				return payload(FETCH_LYFT_HISTORY,parsedHistory)	
			});
};

export function selectHistory(selectedHistory) {
	
	return payload(SELECT_HISTORY,selectedHistory)
};


function payload(type,request) {
	return { 
		type: type, 
		payload: request 
	}
};




