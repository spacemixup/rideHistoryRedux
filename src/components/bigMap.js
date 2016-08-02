import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

const BigMap = props =>  (
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
								ref={(map) => console.log("map", map)}
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
	);

export default BigMap;