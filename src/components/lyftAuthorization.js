import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLyftAuth } from '../actions/index.js';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import axios from 'axios';
import LyftButton from './lyftButton';



class LyftAuthorization extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			lyftAccessToken: ''
		}
	}

	getLyftAccessToken(lyftAuthorizationCode) {
		
		let lyftAuthCode;

		axios({
			method: 'post',
			url: lyftTokenUri,
			headers: {
				"Authorization": "Basic " + btoa(lyftClientId + ":" + lyftClientSecret)
			},				
			data: {	
				'grant_type': 'authorization_code',
				'code': lyftAuthorizationCode
			}
		})
		.then(function(response) {
			console.log(response)
			sessionStorage.setItem('lyftAccessToken', response.data.access_token);
			browserHistory.push('/history')
		})
		.catch(function (err) {
				console.log(err)
		});
	}

	//getLyftAccessToken.then go to next page.

	render() {
		const lyftAuthorizationCodeUri = window.location.href;
		const lyftAuthorizationCode = lyftAuthorizationCodeUri.substring(lyftAuthorizationCodeUri.indexOf('=')+1, lyftAuthorizationCodeUri.indexOf('=')+17);
		this.getLyftAccessToken(lyftAuthorizationCode)
	
		return (
			<div>
				<h1>authenticating..</h1>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { auth: state };
}

export default connect(mapStateToProps, { getLyftAuth })(LyftAuthorization);

