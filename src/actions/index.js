import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import moment from 'moment';
import { lyftTokenUri, lyftApiHistoryUrl } from '../components/keys';

export const FETCH_LYFT_HISTORY = 'FETCH_LYFT_HISTORY';
export const SELECT_HISTORY = 'SELECT_HISTORY';



// axios.interceptors.request.use(function(config) {
// 			setTimeout(function(){}, 4000);
// 			return config;
// 		}, function (error) {
// 			return Promise.reject(error);
// 		})

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function convertHistoryObjToArray(object) {
	let result = [];					
		for (var i=0; i<object.data.ride_history.length; i++) {	
		// for (var i=object.data.ride_history.length-1; i>0; i--) {	
			var lyftRideData = object.data.ride_history[i];						
			result.push(lyftRideData);
		};
	return result;
};

function parseLyftHistory(array) {
	let result = [];

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
};


export function fetchLyftHistory() {
		const lyftAccessToken = sessionStorage.getItem('lyftAccessToken')
		//no limit = 10. //max limit = 50
		const request = axios({
										method: 'GET',
										url: lyftApiHistoryUrl+'?start_time=2015-01-01T00:00:00Z&limit=50',
										headers: {
											Authorization: 'Bearer '+ lyftAccessToken
										}
									})
			return request.then(function(response) {
				let convertedArray = convertHistoryObjToArray(response)
				let parsedHistory = parseLyftHistory(convertedArray)
				let lastDate = (parsedHistory[parsedHistory.length-1].requested_at)
			return payload(FETCH_LYFT_HISTORY,parsedHistory)
		})
};

// export function fetchLyftHistory() {
		

// 	const lyftAccessToken = sessionStorage.getItem('lyftAccessToken')
		
// 		function firstReq() {
// 		let firstReq =  axios({
// 											method: 'GET',
// 											url: lyftApiHistoryUrl+'?start_time=2015-01-01T00:00:00Z&limit=50',
// 											headers: {
// 												Authorization: 'Bearer '+ lyftAccessToken
// 											}
// 										})
// 		return firstReq;
// 		}
		
// 		function secReq() {
// 		let secReq = axios({
// 										method: 'GET',
// 										url: lyftApiHistoryUrl+'?start_time=2016-01-01T00:00:00Z&limit=50',
// 										headers: {
// 											Authorization: 'Bearer '+ lyftAccessToken
// 										}
// 									})
// 		return secReq;
// 		}
		
// 		return axios.all([firstReq(), secReq()])
// 		.then(axios.spread(function (firstReq, secReq) {
// 				let convertedArray = convertHistoryObjToArray(firstReq)
// 				let parseLyftHistory = parseLyftHistory(convertedArray)

// 				return payload(FETCH_LYFT_HISTORY,parsedHistory)		
// 			}));
// };

//endTime
// export function fetchLyftHistory() {
		
// 	const lyftAccessToken = sessionStorage.getItem('lyftAccessToken')
	
		
// 	let request = function(startTime, endTime) {
// 		//must convert because lyft api request requires ISO 8601 UTC, but passes back ISO 8601 local;
// 		let parsedStart = moment(startTime).format();
// 		let parsedEnd = moment(endTime).format();
		
// 		const a = axios({
// 						method: 'GET',
// 						// url: lyftApiHistoryUrl+'?start_time='+parsedTime+'&end_time='+endTime+'&limit=50',
// 						url: lyftApiHistoryUrl+'?start_time='+parsedStart+'&end_time='+parsedEnd+'&limit=50',
// 						headers: {
// 						Authorization: 'Bearer '+ lyftAccessToken
// 					}
// 		});
// 		return a;
// 	};

// 	let parsedHistory = [];

// 	function makeRequest(callback, startTime, endTime) {
		

// 		return callback(startTime, endTime).then(function(response) {
		
// 			let convertedArray = convertHistoryObjToArray(response);
// 			console.log("convertedArray", convertedArray)
// 			let parsedLyftHistory = parseLyftHistory(convertedArray);

			
// 			//get converted earliest(last) ride request time
// 			console.log("parsedLyftHistory", parsedLyftHistory)
// 			if (parsedLyftHistory.length != 0) {
// 	 			let lastLyftRideTime = parsedLyftHistory[parsedLyftHistory.length-1].requested_at;	
// 				// let lastLyftRideTime = convertedArray[0].requested_at;	
// 				parsedHistory = parsedHistory.concat(parsedLyftHistory)			
				
// 				//if the last ride time in the response is later than the startTime
// 				if(moment.max(moment(lastLyftRideTime), moment(startTime)).format() === moment(lastLyftRideTime).format()) {
// 					// call again - passing in original start time and last ride time as the new bounds.
// 					console.log("startTime", startTime, "lastlyft", lastLyftRideTime) 
// 					return makeRequest(callback, startTime, lastLyftRideTime);
// 				} 
// 			}
			
// 			return payload(FETCH_LYFT_HISTORY,parsedHistory);	
			
// 		});
	
// 	}
	
// 	let currentTime = moment().format();
// 	let sixMonthsAgo = moment().subtract(181, 'days').calendar();
// 	let threeMonthsAgo = moment().subtract(90, 'days').calendar();
// 	let oneMonthAgo = moment().subtract(31, 'days').calendar();
// 	let twoMonthsAgo = moment().subtract(60, 'days').calendar();	
// 	let oneYearAgo = moment().subtract(365, 'days').calendar();

// 	//start query anything after x months but before now
// 	return makeRequest(request, twoMonthsAgo, currentTime);
// };

//no endTime
// export function fetchLyftHistory() {
		
// 	const lyftAccessToken = sessionStorage.getItem('lyftAccessToken');
// 	const origin = '2015-01-01T00:00:00Z';

// 	let parsedHistory = [];
// 	let counter = 0;	
		
// 	let request = function(startTime) {
// 		//must convert because lyft api request requires ISO 8601 UTC, but passes back ISO 8601 local;
// 		let parsedStart = moment(startTime).format();
		
// 		const a = axios({
// 								method: 'GET',
// 								url: lyftApiHistoryUrl+'?start_time='+parsedStart+'&limit=50',
// 								headers: {
// 								Authorization: 'Bearer '+ lyftAccessToken
// 								}
// 							});

// 		// setTimeout(function(a) {console.log(a); return a}, 5000);
// 		return a;
// 	} 

// 	function makeRequest(callback, startTime) {
// 		return delay(10000)
// 			.then(() => {
// 				return callback(startTime)
// 			.then( response => {
			
// 				let convertedArray = convertHistoryObjToArray(response);
// 				let parsedLyftHistory = parseLyftHistory(convertedArray);
				
// 				if (parsedLyftHistory.length != 0) {
// 		 			let lastLyftRideTime = parsedLyftHistory[parsedLyftHistory.length-1].requested_at;	
// 					parsedHistory = parsedHistory.concat(parsedLyftHistory)			
// 					if (convertedArray.length === 50) {
// 						// counter++
// 						// if (counter === 3) {
// 						// 	alert("hit 3")
// 						// 	return payload(FETCH_LYFT_HISTORY,parsedHistory);	
// 						// }
// 					 //recurse
// 					 return makeRequest(callback, lastLyftRideTime);
// 					}	
// 				} 
// 				//return variable
// 				parsedHistory.reverse();
// 				return payload(FETCH_LYFT_HISTORY,parsedHistory);	
// 			});
// 		});
// 	};	
// 	return makeRequest(request, origin);
// };


	let currentTime = moment().format();
	let sixMonthsAgo = moment().subtract(181, 'days').calendar();
	let threeMonthsAgo = moment().subtract(90, 'days').calendar();
	let oneMonthAgo = moment().subtract(31, 'days').calendar();
	let twoMonthsAgo = moment().subtract(60, 'days').calendar();	
	let oneYearAgo = moment().subtract(365, 'days').calendar();


export function selectHistory(selectedHistory) {
	return payload(SELECT_HISTORY,selectedHistory)
};


function payload(type,request) {
	return { 
		type: type, 
		payload: request 
	}
};


