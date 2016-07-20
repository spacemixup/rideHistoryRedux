import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLyftHist } from '../actions/index.js';
import datejs from 'datejs';

let lyftHistory = [];

class LyftHist extends Component {
	componentWillMount() {
		this.props.fetchLyftHist()
	}

	renderHistory() {
		// console.log("this.props.history",this.props.history)
		return this.props.history.map((ride) => {
			var pickupTime = Date.parse(ride.pickupTime)
			console.log(pickupTime)

			return (
				<tr key={ride.ride_id}>
				{/*<li className="list-group-item" key={ride.ride_id}>*/}
					<td>{Date.parse(ride.requested_at).toString()}</td>
					<td>{Date.parse(ride.pickupTime).toString()}</td>
					
					<td>{ride.pickupLoc}</td>
					<td>{ride.dropoff.loc}</td>
					<td>{ride.ride_type}</td>
					{/*<td>{ride.status}</td>*/}
				{/*</li>*/}
				</tr>
			)
		})
	}
 	
	render() {
		return (
			<table className="table table-hover">
				<thead>	
					<tr>
						<th>Time Requested</th>
						<th>Time Picked Up</th>
						<th>Pick up Location</th>
						<th>Drop Off Location</th>
						<th>Ride Type</th>
						{/*<th>Ride Status</th>*/}
					</tr>
				</thead>
				<tbody>
					{this.renderHistory()}
				</tbody>
			</table>
		);
	}
}


function mapStateToProps(state) {
	return { history: state.history.all };
}

export default connect(mapStateToProps, { fetchLyftHist })(LyftHist);


