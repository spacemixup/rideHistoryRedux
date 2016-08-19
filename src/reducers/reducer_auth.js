import { FETCH_LYFT_HISTORY, SELECT_HISTORY } from '../actions/index';
const INITIAL_STATE = { all: [], selectedHistory: null, marker:[] };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_LYFT_HISTORY:
			return {...state, all: action.payload }
		case SELECT_HISTORY:
			return {...state, selectedHistory: action.payload, marker:{
																																	ride_id: action.payload.ride_id,	
																																	originLatLng: {
																																	lat:action.payload.origin_lat, 
																																	lng:action.payload.origin_lng
																																	},
																																	dropoffLatLng: {
																																	lat: action.payload.dropoff_lat,
																																	lng: action.payload.dropoff_lng
																																	}
																												 				}	
             }
		default: 
			return state;
		}
	}