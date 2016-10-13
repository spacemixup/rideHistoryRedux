import React, { Component } from 'react';

const lyft = require('../../keys.js');

class LyftButton extends Component {
	authorizeLyft(e) {
		e.preventDefault();
		window.location.assign(`https://www.lyft.com/oauth/authorize?scope=rides.read&response_type=code&state=true&client_id=${lyft.ClientId}`);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.authorizeLyft}>
					<button className="authorizeLyft" type="submit">Authorize Lyft</button>
				</form>
			</div>
		);
	}
}

export default LyftButton;