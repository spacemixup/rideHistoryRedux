import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';


// const BigMap = (props) =>  {
		
// 		var existingMap = props.refs
		
// 		if (existingMap) {
// 			console.log('hi', existingMap)
// 		}

// 			return (
// 			<section style={{ height: `100%` }}>	
// 					<GoogleMapLoader
// 						containerElement={
// 							<div 
// 								{...props.containerElementProps}
// 								style={{
// 									width: '100vw',
// 									height:'50vh'
// 								}}
// 							/>
// 						}
// 						googleMapElement={
// 							<GoogleMap
// 								ref={(map) => console.log(map)}
// 								defaultZoom={props.defaultZoom}
// 								defaultCenter={props.defaultCenter}
								
// 							>
// 							{props.markers.map((marker, index) => (
//             		<Marker
//               		{...marker}
//             		/>
//           		))}
//         		</GoogleMap>						
// 						}
// 					/>
// 			</section>
// 	)			
// };

// export default BigMap;

const BigMap = (props) =>  {
		console.log("props", props)
		

			return (
			<section style={{ height: `100%` }}>	
					<GoogleMapLoader
						containerElement={
							<div 
								{...props.containerElementProps}
								style={{
									width: '100vw',
									height:'50vh'
								}}
							/>
						}
						googleMapElement={
							<GoogleMap
								ref={ map => {
									if (!map) {
										return;
									} 
									console.log("map",map);
									if (map.getBounds() && props.markers.length > 0) {
										
										console.log("latlng",props.markers[0].position, props.markers[1].position)
										let bounds = new google.maps.LatLngBounds()
										bounds.extend(new google.maps.LatLng(props.markers[0].position))
										bounds.extend(new google.maps.LatLng(props.markers[1].position))
										map.fitBounds(bounds);
										console.log(map.props.map.zoom)
									}
								}}
								defaultZoom={props.defaultZoom}
								defaultCenter={props.defaultCenter}
							>
							
							{props.markers.map((marker, index) => {
            		console.log("marker pos", marker.position)


            		return (
            			<Marker
              		{...marker}
            		/>
            		);
          		})}
        			</GoogleMap>						
						}
					/>
			</section>
	)			
};

export default BigMap;