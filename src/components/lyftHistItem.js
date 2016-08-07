import React from 'react';
import moment from 'moment';

const LyftHistItem = ({ride, onRowSelect}) => {
	
	let convertToDollar = n => '$'+(n/100).toFixed(2);
	
	return (
		<tr onClick={()=> onRowSelect(ride)}>
			<td>{moment(ride.pickupTime).format("dddd, MMMM Do YYYY, h:mm a")}</td>
			<td>{moment(ride.requested_at).format("dddd, MMMM Do YYYY, h:mm a")}</td>
			<td>{ride.pickupLoc}</td>
			<td>{ride.dropoff.loc}</td>
			<td>{convertToDollar(ride.rideCost)}</td>
			<td>{convertToDollar(ride.rideOriginalCost)}</td>
			<td>{ride.ride_type}</td>
		</tr>
	);
};

export default LyftHistItem;
