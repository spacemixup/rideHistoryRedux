import axios from 'axios';

export const FETCH_AUTH = 'FETCH_AUTH'




export function fetchAuth(lyftAuthorizationCode) {
	const	request = axios({
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
			// .then(function(response) {
			// 	lyftAccessToken = response.access_token;
			// 	lyftRefreshToken = response.refresh_token;
			// 	console.log(response)
			// })
			// .catch(function (err) {
			// 		console.log(err)
			// });
	
	return {
		type: FETCH_AUTH,
		payload: request
	};
}