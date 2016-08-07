import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import { connect } from 'react-redux';
import { fetchLyftHistory, selectHistory } from '../actions/index.js';
import { default as update } from "react-addons-update";

import LyftHist from './lyftHist';
import BigMap from './BigMap';

class BigContainer extends Component {
	

	componentWillMount() {
		this.props.fetchLyftHistory()
	};

	onHistorySelect(selectedHistory) {
		this.props.selectHistory(selectedHistory)
	}; 
  
  markerArray() {    
    //take the marker object - this.props.marker
      //parse the object into an array
      var data = this.props.selectedHistory
      if (data) {

        let start = new google.maps.MarkerImage('https://www.google.com/mapfiles/dd-start.png')
        let end = new google.maps.MarkerImage('https://www.google.com/mapfiles/dd-end.png')

        return [
          {
            defaultAnimation:2,
            key: Date.now(),
            position: this.props.marker.originLatLng,
            icon: start
          },
          {
            defaultAnimation:2,
            key: this.props.ride_id,
            position: this.props.marker.dropoffLatLng,
            icon: end
          }  
        ];
      } else {
        return [];
      }
  };

  center() {
    var data = this.props.selectedHistory
    if (data) {
      return {
        lat: this.props.marker.originLatLng.lat,
        lng: this.props.marker.originLatLng.lng
      }
    } else {
      return {
        lat: 37.7749,
        lng: -122.4194
      }
    }
  };

  fitBounds() {
    var data = this.props.selectedHistory
    if (data) {
      
      var bounds = new google.maps.LatLngBounds()
      let start = new google.maps.LatLng(this.props.marker.originLatLng.lat, this.props.marker.originLatLng.lng)
      let end = new google.maps.LatLng(this.props.marker.dropoffLatLng.lat, this.props.marker.dropoffLatLng.lng)
      bounds.extend(start);
      bounds.extend(end);
      
      return bounds;
    } else {  
      var bounds = new google.maps.LatLngBounds();
      return bounds;
    } 
  }
  

	render() {
    return (
			<div className="container">	
				<div className="mainMap">
					<BigMap
            selectedHistory = {this.props.selectedHistory}
						defaultZoom = {13}
						defaultCenter = {this.center()}
						markers={this.markerArray()}
        	
            
					/>
				</div>
				<div className="lyftHist">
					<LyftHist 
						history = {this.props.history}
						onHistorySelect = {selectedHistory => this.onHistorySelect(selectedHistory)}
					/>
				</div>
			</div>

		)
	}
}

function mapStateToProps(state) {
	return { 
		history: state.history.all, 
		selectedHistory: state.history.selectedHistory,
    marker: state.history.marker
	};
};

export default connect(mapStateToProps, { fetchLyftHistory, selectHistory })(BigContainer);