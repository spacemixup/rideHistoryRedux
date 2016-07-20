import React, { Component } from 'react';
import LyftAuthorization from './lyftAuthorization';

const lyftClientId = '76w9JwuMxobz';
const lyftClientSecret = '0dHw3FIhpOGVc4Bv7agROzU46uSi8O5p';

class LyftButton extends Component { 

	authorizeLyft(e) {
		e.preventDefault()
		window.location.assign('https://www.lyft.com/oauth/authorize?scope=rides.read&response_type=code&state=true&client_id='+lyftClientId)
	}

	render() {
		return ( 
			<div>
				<form onSubmit={this.authorizeLyft}>
					<button className='authorizeLyft' type='submit'>Authorize Lyft</button>
				</form>
			</div>
		)
	}
}

export default LyftButton;