import React from 'react';
// import d3 from 'd3';
const d3 = require('d3');
import crossfilter from 'crossfilter';
import dc from 'dc';
// const dc = require('dc');
import moment from 'moment';


const Charts = ({props}) => {
  
  let tsvData = props;

  
    x.domain(data.map((d) => { return d.letter}));


  console.log("props", props)
  var rowChart = dc.rowChart("#dc-bubble-graph");
  var volumeChart = dc.rowChart("#dc-volume-chart");
  // var lineChart = dc.lineChart("#dc-line-chart");
  // var dataTable = dc.dataTable("#dc-table-graph");
  // var rowChart = dc.rowChart("#dc-row-graph");
  // var timeChart = dc.barChart("#dc-bar-graph");
  // var pieChart = dc.pieChart("#dc-pie-graph");
  var dateFormat = d3.timeFormat('%m/%d/%Y');

  props.forEach((d) => {
    let day = moment(d.pickup_time).format("MMM Do YY");
    let month = moment(d.pickup_time).format("MMM");
    let year = moment(d.pickup_time).format("YY");
    d.dd = day
    d.month = month
    d.year = year;
    d.close = +d.close;
    d.open = +d.open;
  });

  const ndx = crossfilter(props);

  const all = ndx.groupAll();

  const yearlyDimension = ndx.dimension((d) => d.year);
  const monthlyDimension = ndx.dimension((d) => d.month);


  const rideTypeDimension = ndx.dimension((d) => d.ride_type);
  const rideTypeGroup = rideTypeDimension.group();


  const mDg = monthlyDimension.group();
  
  mDg.top(Infinity).forEach(function(d,i) {
    console.log(`${d.key} : ${d.value}`)
  });

  const monthlyPerformanceGroup = monthlyDimension.group().reduce(
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

  const dateDimension = ndx.dimension((d) => d.dd);

  const moveMonths = ndx.dimension((d) => d.month);

  // const monthlyMoveGroup = moveMonths.group().reduceSum((d) => Math.abs(d.close - d.open));


  //Create dimensions
  // const costDimension = ndx.dimension( (d) => d.ride_cost);
  // const costGroup = costDimension.group();

  // const costDimensionGroup = costDimension.group().reduce(
  //   function (p, v) {
  //     ++p.count;
  //     p.cost += v.ride_cost;
  //     p.driver_rating_sum += v.driver_rating;
  //     p.cost_avg = p.cost / p.count;
  //     p.driver_rating_avg = p.driver_rating_sum / p.count;
  //     return p;
  //   },
  //   function (p, v) {
  //     --p.count;
  //     p.cost -= v.ride_cost;
  //     p.driver_rating_sum -= v.driver_rating;
  //     p.cost_avg = p.cost / p.count;
  //     p.driver_rating_avg = p.driver_rating_sum / p.count;
  //     return p;
  //   },
  //   //init
  //   function (p, v) {
  //     return { count: 0, cost: 0, cost_avg: 0, driver_rating_sum: 0, driver_rating_avg: 0 };
  //   }
  // );

  // const rideTypeDimension = ndx.dimension((d) => d.ride_type);
  // const carMakeDimension = ndx.dimension( (d) => d.vehicle_make);
  // const carModelDimension = ndx.dimension( (d) => d.vehicle_model);
  // const carModelColorDimension = ndx.dimension( (d) => d.vehicle_color);

  

  

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
  
    let date = new Date(d.pickup_time);
    let month = date.getMonth();
    // console.log(month)
    return month;
    // console.log(formatMonth(date));
    // return formatMonth(date);
  });

  const volumeByMonthGroup = volumeByMonthDimension.group();
  // const volumeByMonthGroup = volumeByMonthDimension.group()
  //                                                  .reduceCount((d) => d.pickup_time);


  const monthlySum = ndx.dimension((d) => {
    const month = d.month;
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
      default: 
        return 'Error';
    }
  });

  const monthlySumGroup = monthlySum.group().reduceSum((d) => d.ride_cost);

  const totalRides = ndx.groupAll().reduceCount().value();
  console.log(`There are ${totalRides} totalRides`);

  const dayOfWeek = ndx.dimension((d) => d.day_of_week);
  const dayOfWeekGroup = dayOfWeek.group();

  
  const driver = ndx.dimension((d) => d.driver);
  const driverRating = ndx.dimension((d) => d.driver_rating);
  const vehicle_year = ndx.dimension((d) => d.vehicle_year);

  //for volumechart
  
  //for pieChart
  let startValue = dayOfWeek;
  let startValueGroup = startValue.group();

  rowChart.width(400)
             .height(250)
             .dimension(monthlyDimension)
             .group(mDg)
             
  volumeChart.width(400)
          .height(250)
          .dimension(rideTypeDimension)
          .group(rideTypeGroup)
          // .x(d3.scaleLinear().domain([1, 3]))


console.log("bub", rowChart.dimension(monthlyDimension))

  // rowChart.width(300)
  //         .height(200)
  //         .dimension(dayOfWeek)
  //         .group(dayOfWeekGroup);
        
  // console.log('d3', d3);
  // console.log('d3.scaleLinear()', d3.scaleLinear());      

  // timeChart.width(960)
  //          .height(100)
  //          .dimension(volumeByMonthDimension)
  //          .group(volumeByMonthGroup)
           // .x(d3.scale.ordinal())
           //  .xUnits(dc.units.ordinal())

   // timeChart.width(400)
   //         .height(300)
   //         .dimension(volumeByMonthDimension)
   //         .group(volumeByMonthGroup)
   //         .xUnits(function() {return 30})
   //         .x(d3.scaleLinear().domain([1, 12]))           
    
  dc.renderAll();

  return (
    <div className="row-fluid">
      <div className="remaining-graphs span8">
        <div className="row-fluid">
          <div className="bubble-graph span12" id="dc-bubble-graph">
          </div>
        </div>
        <div className="row-fluid">
         <div className="row-graph" id="dc-volume-chart">
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
