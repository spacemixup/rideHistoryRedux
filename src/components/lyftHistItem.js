import React from 'react';
import moment from 'moment';

const LyftHistItem = ({ ride, onRowSelect }) => {
  const convertToDollar = n => '$'+(n/100).toFixed(2);
  return (
    <tr onClick={() => onRowSelect(ride)}>
      <td>{moment(ride.pickup_time).format('dddd, MMMM Do YYYY, h:mm a')}</td>
      <td>{moment(ride.dropoff_time).format('dddd, MMMM Do YYYY, h:mm a')}</td>
      <td>{ride.pickup_loc}</td>
      <td>{ride.dropoff_loc}</td>
      <td>{convertToDollar(ride.ride_cost)}</td>
      <td>{convertToDollar(ride.ride_originalcost)}</td>
      <td>{ride.ride_type}</td>
    </tr>
  );
};

export default LyftHistItem;
