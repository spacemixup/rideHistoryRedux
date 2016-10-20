import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse } from 'react-bootstrap';
import { default as update } from 'react-addons-update';
import { fetchLyftHistory, selectHistory, collapse, updateSliderValue } from '../actions/index.js';
import LyftHist from './lyftHist';
import SimpleMap from './simpleMap';
import Charts from './charts';
import DisplayBar from './displayBar';

import { Scrollbars } from 'react-custom-scrollbars';

import MainSlider from './mainSlider';

class BigContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: new google.maps.LatLng(41.8507300, -87.6512600),
      destination: new google.maps.LatLng(41.8525800, -87.6514100),
      directions: null,  
    };
  }
  //make sure there's initial history - pulls the history.
  componentWillMount() {
    this.props.fetchLyftHistory();
  }

  onValueSelect(selectedValue) { 
    this.props.selectHistory(this.props.history[selectedValue]);
  }
  // // toggleCollapse(state) {
  // //   console.log("state", state)
  // //   console.log("props", this.props)
  // //   this.props.collapse(state);
  // // };

  markerArray() {
    //take the marker object - this.props.marker
      //parse the object into an array
    const data = this.props.selectedHistory;
    if (data) {
      const startIcon = new google.maps.MarkerImage('https://www.google.com/mapfiles/dd-start.png');
      const endIcon = new google.maps.MarkerImage('https://www.google.com/mapfiles/dd-end.png');

      return [
        {
          defaultAnimation:2,
          key: this.props.ride_id+'pickup',
          position: this.props.marker.originLatLng,
          icon: startIcon,
        },
        {
          defaultAnimation:2,
          key: this.props.ride_id+'dropoff',
          position: this.props.marker.dropoffLatLng,
          icon: endIcon,
        },
      ];
    }
    return [];
  }

  setCenter() {
    const data = this.props.selectedHistory;

    if (data) {
      return {
        lat: this.props.marker.originLatLng.lat,
        lng: this.props.marker.originLatLng.lng,
      };
    }
    return {
      lat: 37.7749,
      lng: -122.4194,
    };
  }

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
  
  // <div className="lyftHist">
  //          <LyftHist
  //            history={this.props.history}
  //            onHistorySelect={selectedHistory => this.onHistorySelect(selectedHistory)}
  //          />
  //      </div>

  //   );
  // }

  // <BigMap
  //   selectedHistory={this.props.selectedHistory}
  //   defaultZoom={12}
  //   defaultCenter={this.setCenter()}
  //   markers={this.markerArray()}
  // />

  mainSlider() {
    const data = this.props.history;
    if (data[0]) {
      return (
        <MainSlider 
          history={this.props.history}
          onValueSelect={selectedValue => this.onValueSelect(selectedValue)}
        />
      );
    }
    return (
      <div> loading.. </div>
    )
  }

  getDirections() {
    const data = this.props.selectedHistory;
    
    if (data) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: this.props.marker.originLatLng,
        destination: this.props.marker.dropoffLatLng,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
      });
    } 

    return this.state.directions;
  }
    
  render() {
    return (
      <div className="bigContainer">
        <div className="leftSide"> 
          <div className="mainMap">
            <SimpleMap
              containerElement={
                <div style={{ height: '100%' }} />
              }
              mapElement={
                <div style={{ height: '100%' }} />
              }
              center={this.setCenter()}
              markers={this.markerArray()}
              directions={this.getDirections()}
            />
         </div>
         <div className="mainSlider"> 
           {this.mainSlider()}
         </div>
         <div className="displayBar">
           <DisplayBar 
            selectedHistory={this.props.selectedHistory}
            history={this.props.history}
           /> 
         </div>
        </div>
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
