import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLyftHistory, selectHistory } from '../actions/index.js';
import datejs from 'datejs';
import LyftHistItem from './lyftHistItem'

const LyftHist = (props) =>  {
	if (!props.history[0]) {
		return <div> Loading...</div>
	};
		
	const histItem = props.history.map((ride) => {	
		return (
			<LyftHistItem 
				onRowSelect={props.onHistorySelect}
				key={ride.ride_id} 
				ride={ride}	
			/>	
		)
	});

	return (
		<table className="table table-hover small" style={{fontSize:'6px'}} >
			<thead>	
				<tr>
					<th>Time Requested</th>
					<th>Time Picked Up</th>
					<th>Pick up Location</th>
					<th>Drop Off Location</th>
					<th>Ride Type</th>
				</tr>
			</thead>
			<tbody>
				{histItem}
			</tbody>
		</table>
	);
};

export default LyftHist;


