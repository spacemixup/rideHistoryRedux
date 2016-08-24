import React from 'react';
import moment from 'moment';
// import blazy from 'blazy';   

//<td>{moment(ride.pickup_time).format('dddd, MMMM Do YYYY, h:mm a')}</td>
//<td>{moment(ride.dropoff_time).format('dddd, MMMM Do YYYY, h:mm a')}</td>
// <td className="driverPic"><img src={ride.driver_image} alt="Smiley face" /></td>

const LyftHistItem = ({ ride, onRowSelect }) => {
  const convertToDollar = n => '$'+(n/100).toFixed(2);
  const fullPrice = ride.ride_originalcost;
  const rideCost = ride.ride_cost;
  const savings = fullPrice - rideCost;

  return (
    <tr onClick={() => onRowSelect(ride)}>
      <td className="rideDate">{moment(ride.pickup_time).format('MMMM Do YYYY')}</td>
      <td>{moment(ride.pickup_time).format('h:mm a')}</td>
      <td>{moment(ride.dropoff_time).format('h:mm a')}</td>
      <td>{ride.pickup_loc}</td>
      <td className="driverPic">driverpic</td>
      <td>{convertToDollar(ride.ride_cost)}</td>
      <td>{convertToDollar(ride.ride_originalcost)}</td>
      <td className="savings">{convertToDollar(savings)}</td>
      <td>{ride.ride_type}</td>
    </tr>
  );
};

// <td className="driverPic">{ride.driver_image}</td>

export default LyftHistItem;
