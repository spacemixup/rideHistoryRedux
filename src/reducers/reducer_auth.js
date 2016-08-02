import { FETCH_LYFT_HISTORY, SELECT_HISTORY } from '../actions/index';

const INITIAL_STATE = { all: [], selectedHistory: null};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_LYFT_HISTORY:
			return { ...state, all: action.payload }
		case SELECT_HISTORY:
			return {...state, selectedHistory: action.payload }	
		default: 
			return state;
		}
	}
