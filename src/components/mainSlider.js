import React, { Component } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

d3.slider = require('d3.slider');

class MainSlider extends Component {


componentDidMount() { 

  let data = this.props.history;
  
  
  const parseDate = d3.time.format.iso
  const lastRide = parseDate.parse(data[0].pickup_time)
  // const firstRide = moment(data[0].pickup_time).format('YYYY-MM-DD HH:mm:ss');
  // const lastRide = moment(data[data.length - 1].pickup_time).format('YYYY-MM-DD HH:mm:ss');
  const firstRide = parseDate.parse(data[data.length - 1].pickup_time)  
  
  data.forEach((d) => {
    d.date = parseDate.parse(d.pickup_time);
  });
  
  d3.select('#slider1').call(
    // d3.slider().scale(d3.scale.identity().domain(data.map((d) => d.date))).axis(d3.svg.axis())
    // d3.slider().scale(d3.time.scale().domain([new Date(firstRide), new Date(lastRide)]).range([padding, width - padding * 2])).axis(d3.svg.axis())
    // d3.slider().scale(d3.time.scale().domain(data.map((d) => d.date))).axis(d3.svg.axis())

    //  d3.slider().scale(d3.scale.identity().domain(data.map((d) => d.date))).axis(d3.svg.axis())
    // .on('slide', (evt, value) => {
    //   d3.select('#slidertext').text(value); 
    // })


    // d3.slider().scale(d3.time.scale().domain([new Date(firstRide), new Date(lastRide)])).axis(d3.svg.axis().ticks(10).tickFormat(d3.time.format("%Y-%m-%d")))
    // .on('slide', (evt, value) => {
    //   d3.select('#slidertext').text(value); 
    // })
    // d3.slider().scale(d3.time.scale().domain([new Date(firstRide), new Date(lastRide)])).axis(d3.svg.axis().ticks(15).tickFormat(d3.time.format("%b %Y")))
    //correctly spits out date
    // d3.slider().scale(d3.time.scale().domain([new Date(firstRide), new Date(lastRide)]).nice()).axis(d3.svg.axis() ).snap(true).value(new Date(2000,1,1))
    

    d3.slider().axis(true).min(0).max(data.length).step(1)

     .on('slide', (evt, value) => { 
      d3.select('#slidertext').text(value); 
      this.props.onValueSelect(value);
    })
  );
}

  render () {
    return (
      <div> 
        <div id="slidertext">0</div>
        <div id="slider1"></div>
      </div>
    )
  }
}
export default MainSlider;