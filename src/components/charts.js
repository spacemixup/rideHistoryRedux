import React from 'react';
// import d3 from 'd3';
const d3 = require('d3');
import crossfilter from 'crossfilter';
import dc from 'dc';



const Charts = ({ props }) => {

  // var bubbleChart = dc.bubbleChart("#dc-bubble-graph");
  // var volumeChart = dc.barChart("#dc-volume-chart");
  // var lineChart = dc.lineChart("#dc-line-chart");
  // var dataTable = dc.dataTable("#dc-table-graph");
  var rowChart = dc.rowChart("#dc-row-graph");
  var timeChart = dc.barChart("#dc-bar-graph");
  // var pieChart = dc.pieChart("#dc-pie-graph");

  props.forEach((d) => d.date = new Date(d.pickup_time));

  const ndx = crossfilter(props);
  //Create dimensions
  const costDimension = ndx.dimension( (d) => d.ride_cost);
  const costGroup = costDimension.group();
  const costDimensionGroup = costDimension.group().reduce(
    function (p, v) {
      ++p.count;
      p.cost += v.ride_cost;
      p.driver_rating_sum += v.driver_rating;
      p.cost_avg = p.cost / p.count;
      p.driver_rating_avg = p.driver_rating_sum / p.count;
      return p;
    },
    function (p, v) {
      --p.count;
      p.cost -= v.ride_cost;
      p.driver_rating_sum -= v.driver_rating;
      p.cost_avg = p.cost / p.count;
      p.driver_rating_avg = p.driver_rating_sum / p.count;
      return p;
    },
    //init
    function (p, v) {
      return { count: 0, cost: 0, cost_avg: 0, driver_rating_sum: 0, driver_rating_avg: 0 };
    }
  );

  const rideTypeDimension = ndx.dimension((d) => d.ride_type);
  const carMakeDimension = ndx.dimension( (d) => d.vehicle_make);
  const carModelDimension = ndx.dimension( (d) => d.vehicle_model);
  const carModelColorDimension = ndx.dimension( (d) => d.vehicle_color);

  const yearlyDimension = ndx.dimension((d) => {
    let getDate = new Date(d.pickup_time);
    let fullYear = getDate.getFullYear();
    return fullYear;
  });

  const yearlyDimensionGroup = yearlyDimension.group();

  // const groupByCarMake =  carMakeDimension.group();
  // groupByCarMake.top(Infinity).forEach(function(d,i) {
  //   console.log(`${d.key} : ${d.value}`)
  // });

  // const groupByCarModel =  carModelDimension.group();
  // groupByCarModel.top(Infinity).forEach(function(d,i) {
  //   console.log(`${d.key} : ${d.value}`)
  // });

  // const groupByCarColor =  carModelColorDimension.group();
  // groupByCarColor.top(Infinity).forEach(function(d,i) {
  //   console.log(`${d.key} : ${d.value}`)
  // });

  const volumeByMonthDimension = ndx.dimension((d) => {
    let formatMonth = d3.timeFormat("%B");
    let date = new Date(d.pickup_time);

    console.log(formatMonth(date));
    return formatMonth(date);
  });

  // const volumeByMonthGroup = volumeByMonthDimension.group()
  const volumeByMonthGroup = volumeByMonthDimension.group()
                                                   .reduceCount((d) => d.pickup_time);


  const monthly = ndx.dimension((d) => {
    const date = new Date(d.pickup_time);
    const month = date.getMonth();
    switch (month) {
      case 1: 
        return 'January';  
      case 2: 
        return 'Feburary';
      case 3:
        return 'March';
      case 4:  
        return 'April';
      case 5: 
        return 'May';
      case 6:  
        return 'June';
      case 7:  
        return 'July';
      case 8:  
        return 'August';
      case 9:  
        return 'September';
      case 10:  
        return 'October';
      case 11:  
        return 'November';
      case 12:  
        return 'December';
    }
  });

  const totalRides = ndx.groupAll().reduceCount().value();
  console.log(`There are ${totalRides} totalRides`);

  const monthlyGroup = monthly.group().reduce((d) => {
    return d.ride_cost;
  })


  const dayOfWeek = ndx.dimension((d) => d.day_of_week);
  const dayOfWeekGroup = dayOfWeek.group();

  
  const driver = ndx.dimension((d) => d.driver);
  const driverRating = ndx.dimension((d) => d.driver_rating);
  const vehicle_year = ndx.dimension((d) => d.vehicle_year);

  //for volumechart
  
  //for pieChart
  let startValue = dayOfWeek;
  let startValueGroup = startValue.group();


//facts - each order entry 
//measure - dollars per order
//dimension - something you want to group or filter - 

  rowChart.width(300)
          .height(200)
          .dimension(dayOfWeek)
          .group(dayOfWeekGroup);
        
  // console.log('d3', d3);
  // console.log('d3.scaleLinear()', d3.scaleLinear());      

  timeChart.width(500)
           .height(200)
           .dimension(volumeByMonthDimension)
           .group(volumeByMonthGroup)
           .x(d3.scaleLinear().domain([6, 20]))
           .xAxis();
           // .x(d3.scaleTime().domain([new Date(2015, 1, 1), new Date(2015, 6, 30)]))
           

  dc.renderAll();

  return (
    <div className="row-fluid">
      <div className="remaining-graphs span8">
        <div className="row-fluid">
          <div className="bubble-graph span12" id="dc-bubble-graph">
          </div>
        </div>
        <div className="row-fluid">
          <div className="pie-graph span4" id="dc-pie-graph">
          </div>
          <div className="row-graph" id="dc-row-graph">
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
