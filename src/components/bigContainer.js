import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import { connect } from 'react-redux';
import { fetchLyftHistory, selectHistory } from '../actions/index.js';
import { default as update } from "react-addons-update";

import LyftHist from './lyftHist';
import BigMap from './BigMap';


class BigContainer extends Component {
	state = {
    markers: [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001,
      },
      key: `Taiwan`,
      defaultAnimation: 2,
    }],
  }

	componentWillMount() {
		this.props.fetchLyftHistory()
	}

	componentDidMount() {
	   setTimeout(() => {
      let { markers } = this.state;
      markers = update(markers, {
        $push: [
          {
            position: {
              lat: 25.99,
              lng: 122.9,
            },
            defaultAnimation: 2,
            key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
          },
        ],
      });
      this.setState({ markers });
    }, 2000);
	}


	onHistorySelect(selectedHistory) {
		this.props.selectHistory(selectedHistory)
	}

	render() {
		console.log("selecHistProps", this.props.selectedHistory)
		return (
			<div className="container">	
				<div className="mainMap">
					<BigMap
						selectedHistory = {this.props.selectedHistory}
						defaultZoom = {13}
						defaultCenter = {{ lat: 37.7749, lng: -122.4194 }}
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
		selectedHistory: state.history.selectedHistory
	};
};

export default connect(mapStateToProps, { fetchLyftHistory, selectHistory })(BigContainer);