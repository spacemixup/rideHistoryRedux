import { FETCH_LYFT_HIST } from '../actions/index';

const INITIAL_STATE = { all: []};

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_LYFT_HIST:
			return { ...state, all: action.payload }
		default: 
			return state;
		}
	}
