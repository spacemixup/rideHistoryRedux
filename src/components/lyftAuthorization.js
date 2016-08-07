import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

import LyftButton from './lyftButton';
import { getLyftAuth } from '../actions/index.js';



export default class LyftAuthorization extends Component {

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
			browserHistory.push('/main')
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

