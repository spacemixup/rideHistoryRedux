import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import LyftLogin from './components/lyftLogin';
import LyftAuthorization from './components/lyftAuthorization';
import LyftHist from './components/lyftHist';
import BigContainer from './components/bigContainer';

export default (
  <Route path="/" component={App}>
		<IndexRoute component={LyftLogin} />
		<Route path="/lyft" component={LyftAuthorization} />
		<Route path="/history" component={LyftHist} />
		<Route path="/main" component={BigContainer} />
	</Route>
);
