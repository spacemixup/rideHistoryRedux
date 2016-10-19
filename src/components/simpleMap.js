import React from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'; 

const SimpleMap = withGoogleMap(props => {
  // if (props.directions.geocoded_waypoints[0]) {
  // console.log("props directions", props.directions.geocoded_waypoints[0])
  // }
  // {props.markers.map((marker, index) => (
  //   <Marker
  //     {...marker}
  //   />
  // ))};
  return (
  <GoogleMap
    ref={map => {
      if (!map) {
        return;
      }
      if (map.getBounds() && props.markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(props.markers[0].position));
        bounds.extend(new google.maps.LatLng(props.markers[1].position));
        map.fitBounds(bounds);
      }
    }}
    defaultZoom={13}
    center={props.center}
  >
    {props.directions && 
      <DirectionsRenderer 
        directions={props.directions}  
      />}
    
  </GoogleMap>
)});

export default SimpleMap;
