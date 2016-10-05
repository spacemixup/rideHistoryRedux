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
  } else { 

  // function sort_group(group, order) {
  //   return {
  //       all: function() {
  //           var g = group.all(), map = {};

  //           g.forEach(function(kv) {
  //               map[kv.key] = kv.value;
  //           });
  //           return order.map(function(k) {
  //               return {key: k, value: map[k]};
  //           });
  //       }
  //   };
  // };

  //  var order = props.map(function(values) {
  //     return values.x;
  //   });
  // create dc.js chart objects & link to div
  var ridesByDow = dc.rowChart("#dc-row-ridesByDow");
  var ridesByMonth = dc.barChart("#dc-bar-ridesByMonth");
  var rideType = dc.pieChart("#dc-pie-rideType");  
  var timeChart = dc.lineChart('#dc-line-ridesByMonth');
  
  props.forEach((d) => {  

    d.date = moment(d.pickup_time).format('YYYY-MM-DD HH:mm:ss');
    d.year = moment(d.pickup_time).format('YYYY');
    // d.month = moment(d.pickup_time).format('MMMM');
    d.month = moment(d.pickup_time).format('M');
    d.monthYear = moment(d.pickup_time).format('M-YYYY');
    d.dow = moment(d.pickup_time).format('ddd');
    d.count = 1;
    d.hour = moment(d.pickup_time).format('hh')
  });



  var ndx = crossfilter(props);

  const month = ndx.dimension((d) => d.month)
  const monthGroup = month.group()

  const dowDimension = ndx.dimension((d) => d.dow)
  const dowDimensionGroup = dowDimension.group()

  const rideTypeDimension = ndx.dimension((d) => d.ride_type)
  const rideTypeGroup = rideTypeDimension.group()

  ridesByMonth.width(375)
             .height(200)
             .dimension(month)
             .group(monthGroup)
             .xUnits(()=> 15)
             .x(d3.scaleLinear().domain([1, 12]))
             .elasticY(true)
             .centerBar(true)

  timeChart.width(1100)
    .height(200)
    .dimension(month)
    .group(monthGroup)
    // .x(d3.scaleLinear().domain([1,12]))
    .elasticY(true)
    .x(d3.scaleTime().domain(d3.extent(props, (d) => d.month)))
    .xAxis()

  rideType.width(270)
          .height(200)
          .dimension(rideTypeDimension)
          .group(rideTypeGroup)
          .innerRadius(30)
          .radius(100)
          .label((d) => d.ride_type)
          .legend(dc.legend().y(10).itemHeight(13).gap(5))

  ridesByDow.width(300)
            .height(200)
            .dimension(dowDimension)
            .group(dowDimensionGroup)
    
  dc.renderAll();

  return (
    <div className="row-fluid">
      <div className="remaining-graphs span8">
        <div className="row-fluid">
          <div className="row-graph" id="dc-bar-ridesByMonth"></div>
          <div className="row-graph"  id="dc-row-ridesByDow"></div>
          <div className="row-graph" id="dc-pie-rideType"></div>
          <div className="row-graph dc-chart axis--x" id="dc-line-ridesByMonth"></div>
      </div>
      </div>
    </div>
  );
  // return (
  //   <div> 
  //     <div className="row-graph" id="#dc-bar-ridesByMonth"></div>
  //     <div className="row-graph" id="#dc-pie-rideType"></div>
  //   </div>
  // )
  }
};

export default Charts;
