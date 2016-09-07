import React from 'react';
// import d3 from 'd3';
const d3 = require('d3');
import crossfilter from 'crossfilter';
import dc from 'dc';
// const dc = require('dc');
import moment from 'moment';


const Charts = ({props}) => {
  
  if (!props) { 
    return <div> loading... </div>
  };

  var ridesByMonth = dc.rowChart("#dc-row-ridesByMonth");
  var rideType = dc.rowChart("#dc-row-rideType");

  props.forEach((d) => {  
    d.date = moment(d.pickup_time).format('MMMM Do YY');
    d.year = moment(d.pickup_time).format('YYY');
    d.month = moment(d.pickup_time).format('MMMM');
  });

  const ndx = crossfilter(props);

  const all = ndx.groupAll();

  const yearlyDimension = ndx.dimension((d) => d.year);
  const monthlyDimension = ndx.dimension((d) => d.month);

  const rideTypeDimension = ndx.dimension((d) => d.ride_type);
  const rideTypeGroup = rideTypeDimension.group();

  const mDg = monthlyDimension.group();
  
  ridesByMonth.width(300)
             .height(200)
             .dimension(monthlyDimension)
             .group(mDg);
             
  rideType.width(300)
          .height(200)
          .dimension(rideTypeDimension)
          .group(rideTypeGroup)
    
  dc.renderAll();

  return (
    <div className="row-fluid">
      <div className="remaining-graphs span8">
        <div className="row-fluid">
          <div className="bubble-graph span12" id="dc-bubble-graph">
          </div>
        </div>
        <div className="row-fluid">
         <div className="row-graph" id="dc-row-rideType">
         </div>
          <div className="row-graph" id="dc-row-ridesByMonth">
          </div>
          <div className="row-graph" id="dc-bar-graph">
          </div>
          <div className="pie-graph span4" id="dc-line-chart">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
