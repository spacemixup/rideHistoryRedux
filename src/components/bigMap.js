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
								ref={googleMap => {
									if (!googleMap) {
										return;
									} 
									console.log("gmap",googleMap.props.map);
								}}
								defaultZoom={props.defaultZoom}
								defaultCenter={props.defaultCenter}
								
							>
							{props.markers.map((marker, index) => (
            		<Marker
              		{...marker}
            		/>
          		))}
        		</GoogleMap>						
						}
					/>
			</section>
	)			
};

export default BigMap;