import React, { Component } from 'react';


class LyftButton extends Component { 
	
	authorizeLyft(e) {
		e.preventDefault()
		window.location = lyftAuthorizeUri
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