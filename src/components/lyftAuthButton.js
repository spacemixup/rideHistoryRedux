import React, { Component } from 'react';

class LyftAuthButton extends Component { 


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

export default LyftAuthButton;