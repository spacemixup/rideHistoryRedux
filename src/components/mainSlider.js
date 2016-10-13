import React, { Component } from 'react';
import * as d3 from 'd3';

d3.slider = require('d3.slider');

class MainSlider extends Component {

componentDidMount() { 
  d3.select('#slider1').call(d3.slider());
};
  
  render () {
    return (
      <div id="slider1"></div>
    )
  }
}
export default MainSlider;