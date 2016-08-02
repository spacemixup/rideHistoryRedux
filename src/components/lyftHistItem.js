import React from 'react';
import datejs from 'datejs';

const LyftHistItem = ({ride, onRowSelect}) => {
	const pickupTime = Date.parse(ride.pickupTime)

	return (
		<tr onClick={()=> onRowSelect(ride)}>
			<td>{Date.parse(ride.pickupTime).toString('F')}</td>
			<td>{Date.parse(ride.requested_at).toString('F')}</td>
			<td>{ride.pickupLoc}</td>
			<td>{ride.dropoff.loc}</td>
			<td>{ride.ride_type}</td>
		</tr>
	);
};

export default LyftHistItem;
