import React from 'react';
import moment from 'moment';

const DisplayBar = (props) => {
   
  const convertToDollar = n => '$'+(n/100).toFixed(2);

  if (!props.selectedHistory) { 
    return (
      <div> loading..</div>
    )
  } 

  const data = props.selectedHistory;
  const pickupTime = moment(data.pickup_time);
  const dropOffTime = moment(data.dropoff_time);
  
  return (
    <div className="displaybarInfo">
     
      <div className='driverPicDiv'>
        <img className='driverPic' src={data.driver_image} height='100px' width='160px'/>
      </div> 
      <div className='displayBarItem driver'>
        Driver:{data.driver}
      </div>
      <div className='displayBarItem pickup_loc'>
        Pick Up:{data.pickup_loc}
      </div>
      <div className='displayBarItem dropoff_loc'>
        Drop Off:{data.dropoff_loc}
      </div>
      <div className='displayBarItem ride_cost'>
        {convertToDollar(data.ride_cost)}
      </div>
      <div className="displayBarItem ride_length">
        {dropOffTime.diff(pickupTime, 'minutes')} minutes
      </div>
    </div>
  );
};

export default DisplayBar;
