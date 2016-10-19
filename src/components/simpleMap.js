import React from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'; 

const SimpleMap = withGoogleMap(props => (
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
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
      />
    ))};
  </GoogleMap>
));

export default SimpleMap;
