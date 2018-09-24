import React, { Component } from 'react';
import * as types from "../constants/ActionTypes";
import { formatDisplayTime } from "../utils";

export class Analysis extends Component {

	getTitle = () => {
		switch(this.props.selected) {
			case types.ENTIRE_MINUTES:
				return "Entire Time";
			case types.CUSTOM_MINUTES:
				return "Custom Time";
			case types.BEST_1_MINUTES:
				return "Best 1 Minute";
			default:
				return `Best ${this.props.selected} Minutes`;
		}
	}

	getTime = (indexKey) => {
		if (this.props.selected === types.ENTIRE_MINUTES)
			return "-";
		const offsetSeconds = this.props.highlightedRoute[indexKey];
		return formatDisplayTime(offsetSeconds);
	}
	
	getStartTime = () => this.getTime('startIndex');
	getEndTime = () => this.getTime('endIndex');

	render() {
		return (
			<div className="selector-container--analysis">
				<h2>
					Selection: { this.getTitle() }
				</h2>
				<div>
					Average Power: { this.props.averagePower }
				</div>
				<div>
					Start Offset: { this.getStartTime() }
				</div>
				<div>
					End Offset : { this.getEndTime() }
				</div>

			</div>
		);
	}
};