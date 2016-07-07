import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import LyftButton from './components/lyftButton';



const uberAuthorizeUri = 'https://login.uber.com/oauth/v2/authorize?response_type=code&client_id='+uberClientId

const lyftAuthorizeUri = 'https://www.lyft.com/oauth/authorize?scope=rides.read&response_type=code&state=true&client_id='+lyftClientId; 

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { history: [] };
	} 
	
	render() {
		return (
			<div> 
				<LyftButton />
			</div> 
		)
	}	
}

ReactDOM.render(<App />, document.querySelector('.container'));
