import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

export default function SimpleMap (props) {
	
	window.renderFlights = function() {
	    var flightPlanCoordinates = [
	        {lat: 37.7845, lng: -122.4332},
	        {lat: 37.787088, lng: -122.391128},
	        {lat: 37.77155, lng: -122.43492},
	        {lat: 37.78755, lng: -122.41015},
	        {lat: 37.77157, lng: -122.43523},
	        {lat: 37.78755, lng: -122.40982}
	    ]
	    var flightPath = new google.maps.Polyline({
	        path: flightPlanCoordinates,
	        geodesic: true,
	        strokeColor: '#FF0000',
	        strokeOpacity: 1.0,
	        strokeWeight: 2
	    })

	    flightPath.setMap(window.map.props.map)
	}

	return (

			<GoogleMapLoader
				containerElement={
					<div 
						{...props.containerElementProps}
						style={{
							width: '100vw',
							height:'100vh'
						}}
					/>
				}
				googleMapElement={
					<GoogleMap
						ref={(map) => {window.map = map; window.renderFlights()}}
						defaultZoom={13}
						defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
						onClick={props.onMapClick}
					>
					</GoogleMap>
				}
			/>
	);
}