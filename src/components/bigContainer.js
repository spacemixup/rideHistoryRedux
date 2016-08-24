import React, { Component } from 'react';
import d3 from 'd3';
import crossfilter from 'crossfilter';
import { connect } from 'react-redux';
import { fetchLyftHistory, selectHistory } from '../actions/index.js';
import { default as update } from 'react-addons-update';
import LyftHist from './lyftHist';
import BigMap from './bigMap';
import Charts from './charts';
import { Scrollbars } from 'react-custom-scrollbars';

class BigContainer extends Component {
  //make sure there's initial history - pulls the 
  componentWillMount() {
    this.props.fetchLyftHistory();
  };

  onHistorySelect(selectedHistory) {
    this.props.selectHistory(selectedHistory);
  }; 

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

  render() {
    return (
      <div className="bigContainer">
        <div className="mainMap">
          <BigMap
            selectedHistory={this.props.selectedHistory}
            defaultZoom={14}
            defaultCenter={this.setCenter()}
            markers={this.markerArray()}
          />
        </div>
        <div className="charts">
          <Charts
            props={this.props.history}
          />
        </div>
        <div className="lyftHist">
          <Scrollbars>
            <LyftHist
              history={this.props.history}
              onHistorySelect={selectedHistory => this.onHistorySelect(selectedHistory)}
            />
          </Scrollbars>
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
  };
}

export default connect(mapStateToProps, { fetchLyftHistory, selectHistory })(BigContainer);
