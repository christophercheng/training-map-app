import React, { Component } from 'react';
import * as types from "../constants/ActionTypes";

export class Selection extends Component {

	renderRadioButton = (label, name, value, selectedValue) => (
		<div>
			<input
				type="radio"
				name="segment"
				value={value}
				checked={value === selectedValue}
				onChange={this.props.onSelection}
			/>
				{label}
		</div>	
	);

	render() {
		const selectedOption = this.props.selected;
		return (
			<div className="visualize-container--chart">
				{this.renderRadioButton("Entire time", "segment", types.ENTIRE_MINUTES, selectedOption)}
				{this.renderRadioButton("Best 1 minute", "segment", types.BEST_1_MINUTES, selectedOption)}
				{this.renderRadioButton("Best 5 minutes", "segment", types.BEST_5_MINUTES, selectedOption)}
				{this.renderRadioButton("Best 10 minutes", "segment", types.BEST_10_MINUTES, selectedOption)}
				{this.renderRadioButton("Best 15 minutes", "segment", types.BEST_15_MINUTES, selectedOption)}
				{this.renderRadioButton("Best 20 minutes", "segment", types.BEST_20_MINUTES, selectedOption)}
			</div>
		);
	}
};