import React, { Component } from 'react';
import axios from 'axios';

var lyftClientId = '76w9JwuMxobz';
var lyftClientSecret = '0dHw3FIhpOGVc4Bv7agROzU46uSi8O5p';
var lyftAuthorizationCodeUri = window.location.href
var lyftAuthorizationCode = lyftAuthorizationCodeUri.substring(lyftAuthorizationCodeUri.indexOf('=')+1, lyftAuthorizationCodeUri.indexOf('=')+17);

var lyftTokenUri = 'https://api.lyft.com/oauth/token';
var lyftApiHistoryUrl = 'https://api.lyft.com/v1/rides';


class LyftAuthorization extends Component {


	getLyftAccessTokenRequest() {
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
			lyftAccessToken = response.access_token;
			lyftRefreshToken = response.refresh_token;
			console.log(response)
		})
		.catch(function (err) {
				console.log(err)
		});
	};
	
	render() {
		
		var lyftHistory = [];
		var lyftParsed = [];
		var temp;

			return ( 
				<div>
					<LyftButton />
				</div>
			)
		}
}



export default LyftAuthorization;