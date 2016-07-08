import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LyftLogin from './components/lyftLogin';
import LyftAuthorization from './components/lyftAuthorization';

// <IndexRoute component={PostsIndex} />
export default (
	<Route path="/" component={App}>
		<IndexRoute component={LyftLogin} />
		<Route path="lyft" component={LyftAuthorization} />
	</Route>
);