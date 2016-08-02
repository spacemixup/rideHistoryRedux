import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../actions/index.js';
import { Link } from 'react-router';
import LyftButton from './lyftButton';

class LyftLogin extends Component { 
	render() {
		return (
			<LyftButton />
		);
	};
};

export default LyftLogin;