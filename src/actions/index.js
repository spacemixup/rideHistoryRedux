import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import moment from 'moment';
import { lyftTokenUri, lyftApiHistoryUrl } from '../components/keys';

export const FETCH_LYFT_HISTORY = 'FETCH_LYFT_HISTORY';
export const SELECT_HISTORY = 'SELECT_HISTORY';
export const CHART_RIDES = 'CHART_RIDES'; 

const currentTime = moment().format();
const sixMonthsAgo = moment().subtract(181, 'days').calendar();
const fiveMonthsAgo = moment().subtract(150, 'days').calendar();
const fourMonthsAgo = moment().subtract(120, 'days').calendar();

const threeMonthsAgo = moment().subtract(90, 'days').calendar();
const oneMonthAgo = moment().subtract(31, 'days')
const twoMonthsAgo = moment().subtract(60, 'days')	
const oneYearAgo = moment().subtract(365, 'days').calendar();

const originTime = '2015-01-01T00:00:00Z';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function convertHistoryObjToArray(object) {
	let result = [];					
		for (var i=0; i<object.data.ride_history.length; i++) {	
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
	const lyftAccessToken = sessionStorage.getItem('lyftAccessToken');

	const request = axios({
		method: 'GET', 
		url: 'http://localhost:8080/API/'+lyftAccessToken
	});

	return request
				 .then((response) => {
				 	return payload(FETCH_LYFT_HISTORY,response.data)
				 });

};

// export function fetchLyftHistory() {
// 	const lyftAccessToken = sessionStorage.getItem('lyftAccessToken');

// 	console.log("lyftAccessToken", lyftAccessToken);

// 	let xratelimit = 5;	
// 	let parsedHistoryArray = [];
	
// 	let request = function(startTime) {
// 		//must convert because lyft api request requires ISO 8601 UTC, but passes back ISO 8601 local;
// 		xratelimit --;
// 		let parsedStart = moment(startTime).format();
// 		const a = axios({
// 								method: 'GET',
// 								url: lyftApiHistoryUrl+'?start_time='+parsedStart+'&limit=50',
// 								headers: {
// 								Authorization: 'Bearer '+ lyftAccessToken
// 								}
// 							});

// 		return a;
// 	}; 
	
// 	let lastLyftRideTimePlusOneSec;
// 	let earliestRideTimeMinusOneSec;

// 	function makeRequest(action, startTime) {
// 		return action(startTime)
// 		.then( response => {
// 			console.log(response);
// 			let convertedArray = convertHistoryObjToArray(response);
// 			let parsedLyftHistory = parseLyftHistory(convertedArray);
// 			parsedHistoryArray = parsedHistoryArray.concat(parsedLyftHistory);
// 			//get earliest ride time from the parsed response
// 			if (xratelimit === 0 || parsedLyftHistory.length === 0) {
// 				//find out when the rate limit resets
				
// 				var now = moment();
// 				var x_rate_limit_reset = moment(response.headers.x_ratelimit_reset);
// 				//calculate how soon the x-ratelimit resets
// 				console.log("seconds til x-ratelimit-reset", x_rate_limit_reset.diff(now, 'seconds'))

// 				// console.log("x-ratelimit-reset", moment(response.headers.x_ratelimit_reset)._d)
// 				//calculate the last array for call when it's available
// 				earliestRideTimeMinusOneSec = moment(parsedHistoryArray[0].requested_at).subtract(1, 's')._i;
// 				console.log("earliestRideTimeMinusOneSec", earliestRideTimeMinusOneSec);
// 				parsedHistoryArray.reverse()
// 				return payload(FETCH_LYFT_HISTORY,parsedHistoryArray);		 
// 			};
// 			//take the last item in array (most recent) convert the time + 1 secnd
// 			function calculateLastRideTimePlusOneSec(array) {
// 				let lastLyftRideTime = array[array.length-1].requested_at;
// 				lastLyftRideTimePlusOneSec = moment(lastLyftRideTime).add(1, 's');
// 			}
// 			calculateLastRideTimePlusOneSec(parsedHistoryArray);
// 			//call again starting at one second earlier than the parsed response
// 			return makeRequest(action, lastLyftRideTimePlusOneSec)	
// 		});
// 	};
// 	return makeRequest(request, fiveMonthsAgo);
// };

//set selectedHistory state based on what history was selected 
export function selectHistory(selectedHistory) {
	return payload(SELECT_HISTORY,selectedHistory);
};

function payload(type,request) {
	return { 
		type: type, 
		payload: request 
	};
};

// fetchLyftHistory broken interval requests
// export function fetchLyftHistory() {
// 	let parsedHistory = [];
// 	let counter = 0;
	

// 	const lyftAccessToken = sessionStorage.getItem('lyftAccessToken');

// 	const request = function(startTime, endTime) {
	
// 		//must convert because lyft api request requires ISO 8601 UTC, but passes back ISO 8601 local;
// 		const parsedStart = moment(startTime).format();
// 		const parsedEnd = moment(endTime).format();
			
// 			const request = axios({
// 							method: 'GET',
// 							url: lyftApiHistoryUrl+'?start_time='+parsedStart+'&end_time='+parsedEnd+'&limit=50',
// 							// url: lyftApiHistoryUrl+'?start_time='+parsedStart+'&limit=50',
// 							headers: {
// 							Authorization: 'Bearer '+ lyftAccessToken
// 						}
// 			});
// 			return request;
// 		};

// 	function makeRequest(action, ms, startTime, endTime) {
			
// 			//delay option in case need to make more than 4 requests
// 			return delay(ms)
// 				.then(() => {
// 					//call request with 2 args - starting time. 
// 					return action(startTime, endTime)
// 					.then( response => {
// 						console.log(response);
// 						let convertedArray = convertHistoryObjToArray(response);
// 						let parsedLyftHistory = parseLyftHistory(convertedArray);
// 						console.log(parsedLyftHistory);
// 						if (parsedLyftHistory.length != 0) {
				 			
// 							parsedHistory = parsedHistory.concat(parsedLyftHistory);			
// 							let lastLyftRideTime = parsedHistory[0].start_at;
// 							//ESCAPE ROUTE
// 							//4 is the max # of requests at once before lyft responds with a 429
// 							if (counter === 4) {
// 								return payload(FETCH_LYFT_HISTORY, parsedHistory, 'reverse');	
// 							};
// 							//if the oldest ride in the parsed history is more recent than the startTime
// 							console.log("sT",moment(startTime).isValid(), "llr", moment(lastLyftRideTime).isValid())
// 							if (moment.max(lastLyftRideTime, startTime) === lastLyftRideTime) {
// 								//call it again because we know there are more responses
// 								counter++
// 								return makeRequest(request, 0, startTime, lastLyftRideTime);
// 							//if the oldest ride in the parsed history is not more recent than the startTime
// 							} else {
// 								//call it again but shift the request date back
// 								//startTime is a moment object
// 								console.log("hi")
// 								let shiftDate = startTime.subtract(60, 'days');
// 								counter++ 
// 								return makeRequest(request, 0, shiftDate, currentTime);
// 							};
// 						};	
// 						return payload(FETCH_LYFT_HISTORY, parsedHistory, 'reverse');	
// 					});
// 				});
// 		};	
// 	//we can make a max of 4 requests before needing to slow down(4 req/50per response = 200) assuming 4rides x 30days = 120 is safe limit. one month is a good starting point
// 	//twoMonthsAgo is a moment object
// 	return makeRequest(request, 0, oneMonthAgo, currentTime);
// };

// export function multipleConcurrent() {
		// function firstReq() {
		// let firstReq =  axios({
		// 									method: 'GET',
		// 									url: lyftApiHistoryUrl+'?start_time=2015-01-01T00:00:00Z&limit=50',
		// 									headers: {
		// 										Authorization: 'Bearer '+ lyftAccessToken
		// 									}
		// 								})
		// return firstReq;
		// }
		
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

// export function fetchHistoryWithstartTimeEndTime() {	
// 	let parsedHistory = [];

// 	let request = function(startTime, endTime) {
// 		//must convert because lyft api request requires ISO 8601 UTC, but passes back ISO 8601 local;
// 		let parsedStart = moment(startTime).format();
// 		let parsedEnd = moment(endTime).format();
		
// 		const request = axios({
// 						method: 'GET',
// 						// url: lyftApiHistoryUrl+'?start_time='+parsedTime+'&end_time='+endTime+'&limit=50',
// 						url: lyftApiHistoryUrl+'?start_time='+parsedStart+'&end_time='+parsedEnd+'&limit=50',
// 						headers: {
// 						Authorization: 'Bearer '+ lyftAccessToken
// 					}
// 		});
// 		return request;
// 	};
// 	function makeRequest(action, startTime, endTime, payload) {
		
// 		return action(startTime, endTime).then(function(response) {
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
// 					return makeRequest(action, startTime, lastLyftRideTime);
// 				}; 
// 			};
// 			return payload(FETCH_LYFT_HISTORY,parsedHistory);	
// 		});
// 	}
// 	//start query anything after x months but before now
// 	return makeRequest(request, twoMonthsAgo, currentTime, payload);
// };