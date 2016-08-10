import React, { Component } from 'react';

const DrawPathButtons = function() {

	const chartPath = (n) => {
		//make a call to actions passing how many months to show
		this.props.chartPath(n);
	};

	return (
			<div>
				<button className="showLastMonth" 
								type="button" 
								onClick={chartPath(1)} >
								Last Month 
				</button>

				<button className="showLastSixMonths" 
								type="button" 
								onClick={chartPath(6)} >
								Six Months
				</button>

				<button className="showLastTwelveMonths" 
								type="button" 
								onClick={chartPath(12)} >
								Last Year 
				</button>

			</div>
		);
};

export default DrawPathButtons;