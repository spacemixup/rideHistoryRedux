import { combineReducers } from 'redux';
import AuthReducer from './reducer_auth.js';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	                                        history: AuthReducer,
	                                        form: formReducer,
});

export default rootReducer;
