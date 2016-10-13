import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse } from 'react-bootstrap';

import { fetchLyftHistory, selectHistory, collapse, updateSliderValue } from '../actions/index.js';
import { default as update } from 'react-addons-update';
import LyftHist from './lyftHist';
import BigMap from './bigMap';
import Charts from './charts';

import { Scrollbars } from 'react-custom-scrollbars';

import MainSlider from './mainSlider';

var Slider = require('nw-react-slider')


class BigContainer extends Component {
  //make sure there's initial history - pulls the 
  
  // componentWillMount() {
  //   this.props.fetchLyftHistory();
  // };

  // onHistorySelect(selectedHistory) {
  //   this.props.selectHistory(selectedHistory);
  // }; 

  // // toggleCollapse(state) {
  // //   console.log("state", state)
  // //   console.log("props", this.props)
  // //   this.props.collapse(state);
  // // };

  // handleSliderChange(value, position) {
  //   console.log("POSITION:", position, "VALUE", value)

  //   // console.log("props", this.props)
  //   this.props.updateSliderValue(value);
  // };


  // markerArray() {
  //   //take the marker object - this.props.marker
  //     //parse the object into an array
  //   const data = this.props.selectedHistory;
  //   if (data) {
  //     const startIcon = new google.maps.MarkerImage('https://www.google.com/mapfiles/dd-start.png');
  //     const endIcon = new google.maps.MarkerImage('https://www.google.com/mapfiles/dd-end.png');

  //     return [
  //       {
  //         defaultAnimation:2,
  //         key: this.props.ride_id+'pickup',
  //         position: this.props.marker.originLatLng,
  //         icon: startIcon,
  //       },
  //       {
  //         defaultAnimation:2,
  //         key: this.props.ride_id+'dropoff',
  //         position: this.props.marker.dropoffLatLng,
  //         icon: endIcon,
  //       },
  //     ];
  //   }
  //   return [];
  // }

  // setCenter() {
  //   const data = this.props.selectedHistory;
  //   if (data) {
  //     return {
  //       lat: this.props.marker.originLatLng.lat,
  //       lng: this.props.marker.originLatLng.lng,
  //     };
  //   }
  //   return {
  //     lat: 37.7749,
  //     lng: -122.4194,
  //   };
  // }

  // <div className="charts">
  //   <Button onClick={()=> this.toggleCollapse(!this.props.open)}>
  //   click
  //   </Button>
    
  //   <Collapse in={this.props.open}>
  //   <div>
  //     <Charts
  //       props={this.props.history}
  //     />
  //   </div>
  //   </Collapse>
  // </div>

  // render() {
  //   return (
  //     <div className="bigContainer">
  //      <div className="lyftHist">
  //        <Scrollbars>
  //          <LyftHist
  //            history={this.props.history}
  //            onHistorySelect={selectedHistory => this.onHistorySelect(selectedHistory)}
  //          />
  //        </Scrollbars>
  //      </div>
  //      <div className="slider">
  //       <Slider
  //       value={0}
  //       min={0}
  //       max={5}
  //       ticks
  //       onChange={(value, position) => this.handleSliderChange(value, position)}
  //       displayFollowerPopover
  //       />
  //      </div>
  //     </div>
  // <div className="slider">
  //  <Slider
  //  value={0}
  //  min={0}
  //  max={5}
  //  ticks
  //  onChange={(value, position) => this.handleSliderChange(value, position)}
  //  displayFollowerPopover
  //  />
  // </div>
  // <div className="mainMap">
  //   <BigMap
  //     selectedHistory={this.props.selectedHistory}
  //     defaultZoom={12}
  //     defaultCenter={this.setCenter()}
  //     markers={this.markerArray()}
  //   />
  // </div>
  // <div className="lyftHist">
  //          <LyftHist
  //            history={this.props.history}
  //            onHistorySelect={selectedHistory => this.onHistorySelect(selectedHistory)}
  //          />
  //      </div>

  //   );
  // }
  render() {
    return (
      <div className="bigContainer">
    
      <MainSlider />
       
      </div>


    );
  }
}

function mapStateToProps(state) {
  return {
    history: state.history.all,
    selectedHistory: state.history.selectedHistory,
    marker: state.history.marker,
    open: state.history.open,
    updateSliderValue: state.history.sliderValue
  };
}

export default connect(mapStateToProps, { fetchLyftHistory, selectHistory, collapse, updateSliderValue })(BigContainer);
