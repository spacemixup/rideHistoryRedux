import React from 'react';

const DisplayBar = (props) => {
   
  const convertToDollar = n => '$'+(n/100).toFixed(2);

  if (!props.selectedHistory) { 
    return (
      <div> loading..</div>
    )
  } 
  
  const data = props.selectedHistory;
  
  return (
    <div className="displaybarInfo">
      <div>
      {data.driver}
      </div>
      <div>
      <img className='driverPic' src={data.driver_image} height='15%' width='15%'/>
      </div>
      <div>
      {data.pickup_loc}
      </div>
      <div>
        {data.dropoff_loc}
      </div>
      <div className="displayBar-ride_cost">
        {convertToDollar(data.ride_cost)}
      </div>
    </div>
  );
};

export default DisplayBar;
