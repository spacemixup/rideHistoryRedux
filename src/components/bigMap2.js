import React, { Component} from 'react';
import { withGoogleMap, GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';

// const BigMap = (props) => {
//   return (   
//         <GoogleMapLoader
//           containerElement={
//             <div
//               {...props.containerElementProps}
//               style={{
//                 width: '100%',
//                 height: '100%',
//               }}
//             />
//           }
//           googleMapElement={
//             <GoogleMap
//               ref={map => {
//                 if (!map) {
//                   return;
//                 }
//                 console.log('map',map);
//                 if (map.getBounds() && props.markers.length > 0) {            
//                   console.log('marker coords',props.markers[0].position, props.markers[1].position);
//                   let bounds = new google.maps.LatLngBounds();
//                   bounds.extend(new google.maps.LatLng(props.markers[0].position));
//                   bounds.extend(new google.maps.LatLng(props.markers[1].position));
//                   map.fitBounds(bounds);
//                 }

//               }}
//               defaultZoom={props.defaultZoom}
//               defaultCenter={props.defaultCenter}
//               directions={props.directions}
//             >
//               {props.markers.map((marker, index) => {
//                 console.log("marker pos", marker.position);
//                 return (
//                   <Marker
//                     {...marker}
//                   />
//                 );
//               })}
//             </GoogleMap>
//           }
//         />
//   );
// };

const DirectionsExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class BigMap extends Component {

  state = {
    origin: new google.maps.LatLng(41.8507300, -87.6512600),
    destination: new google.maps.LatLng(41.8525800, -87.6514100),
    directions: null,
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();

  if (this.props.selectedHistory) {  
    DirectionsService.route({
      origin: new google.maps.LatLng(this.props.selectedHistory.origin_lat, this.props.selectedHistory.origin_lng),
      destination: new google.maps.LatLng(this.props.selectedHistory.dropoff_lat, this.props.selectedHistory.dropoff_lng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log("result", result)
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }
}

  render() {
    return (
      <DirectionsExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.props.defaultCenter}
        directions={this.state.directions}
      />
    );
  }
}