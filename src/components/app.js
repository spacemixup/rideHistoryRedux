import React, { Component } from 'react';
import LyftButton from './lyftButton';

export default class App extends Component {
	render() {
		return (
			<div> 
				{this.props.children}			
			</div> 
		)
	}	
}

