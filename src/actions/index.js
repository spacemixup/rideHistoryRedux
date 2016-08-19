import axios from 'axios';

export const FETCH_LYFT_HISTORY = 'FETCH_LYFT_HISTORY';
export const SELECT_HISTORY = 'SELECT_HISTORY';
export const CHART_RIDES = 'CHART_RIDES';

function payload(type, request) {
  return {
    type,
    payload: request,
  };
}

export function fetchLyftHistory() {
  const request = axios({
    method: 'GET',
    url: 'http://localhost:8080/api/history',
  });

  return request
    .then((response) => {
      response.data.reverse();
      return payload(FETCH_LYFT_HISTORY, response.data);
    });
}

// export function fetchLyftHistory() {
//  const lyftAccessToken = sessionStorage.getItem('lyftAccessToken');

//  const request = axios({
//    method: 'POST',
//    url: `http://localhost:8080/api/${lyftAccessToken}`
//  });

//  return request
//         .then((response) => {
//          console.log(response)
//          return payload(FETCH_LYFT_HISTORY,response.data)
//         });
// };

// set selectedHistory state based on what history was selected
export function selectHistory(selectedHistory) {
  return payload(SELECT_HISTORY, selectedHistory);
}
