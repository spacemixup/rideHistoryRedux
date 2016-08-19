import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import { connect } from 'react-redux';
import { fetchLyftHistory, selectHistory } from '../actions/index.js';
import { default as update } from "react-addons-update";
import LyftHist from './lyftHist';
import BigMap from './BigMap';
import DrawPathButtons from './drawPathButtons';
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
      var data = this.props.selectedHistory
      if (data) {

        let startIcon = new google.maps.MarkerImage('https://www.google.com/mapfiles/dd-start.png')
        let endIcon = new google.maps.MarkerImage('https://www.google.com/mapfiles/dd-end.png')

        return [
          {
            defaultAnimation:2,
            key: this.props.ride_id+'pickup',
            position: this.props.marker.originLatLng,
            icon: startIcon
          },
          {
            defaultAnimation:2,
            key: this.props.ride_id+'dropoff',
            position: this.props.marker.dropoffLatLng,
            icon: endIcon
          }  
        ];
      } else {
        return [];
      }
  };

  setCenter() {
    var data = this.props.selectedHistory
    if (data) {
      return {
        lat: this.props.marker.originLatLng.lat,
        lng: this.props.marker.originLatLng.lng
      }
    } else {
      return {
        lat: 37.7749,
        lng: -122.4194,
      }
    }
  };

  render() {
    return (
      <div className="bigContainer">  
        <div className="mainMap">
          <BigMap
            selectedHistory = {this.props.selectedHistory}
            defaultZoom = {14}
            defaultCenter = {this.setCenter()}
            markers={this.markerArray()}
          />
        </div>
        <div className="requestButtons">
          <drawPathButtons />
        </div>
        <div className="lyftHist">
          <Scrollbars style={{ width: '100%', height: '50vw' }}>
          <LyftHist 
            history = {this.props.history}
            onHistorySelect = {selectedHistory => this.onHistorySelect(selectedHistory)}
          />
          </Scrollbars>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    history: state.history.all,
    selectedHistory: state.history.selectedHistory,
    marker: state.history.marker,
  };
}

export default connect(mapStateToProps, { fetchLyftHistory, selectHistory })(BigContainer);
