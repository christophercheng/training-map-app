import * as types from "../constants/ActionTypes";

import { calculateAveragePower, getRangeHash } from "../utils";

export const initializeWorkoutData = workoutData => dispatch => {
	dispatch(storeWorkoutData(workoutData));
	dispatch(calculateBestPowerSegments(workoutData, dispatch));
	dispatch(buildRouteData(workoutData));
	dispatch(storeAveragePower(getRangeHash([0, workoutData.length-1]), calculateAveragePower(workoutData)));
};

export const handleSelectorOption = (selectorOption, range) => (dispatch, getState) => {
	dispatch(setSelectorOption(selectorOption));
	switch (selectorOption) {
		case (types.BEST_1_MINUTES):
		case (types.BEST_5_MINUTES):
		case (types.BEST_10_MINUTES):
		case (types.BEST_15_MINUTES):
		case ("20"):
			let { startIndex, endIndex } = getState().bestPowerPeriods[parseInt(selectorOption,10)];
			dispatch(highlightRoute([startIndex, endIndex]));
			break;
		case (types.ENTIRE_MINUTES):
			dispatch(clearHighlightRoute());
			break;
		case (types.CUSTOM_MINUTES):
			dispatch(highlightRoute(range));
			const rangeHash = getRangeHash(range);
			if (!(rangeHash in getState().averagePower))
				dispatch(storeAveragePower(rangeHash, calculateAveragePower(getState().workoutData.slice(range[0], range[1]))));
			break;
		default:
			break;
	}
};

function storeWorkoutData(workoutData) {
	return {
		type: types.STORE_WORKOUT_DATA,
		workoutData
	};
}

function calculateBestPowerSegments(workoutData, dispatch) {
	const durations = [1, 5, 10, 15, 20];
	const periods = durations.reduce( (acc, curr, index) => ({ ...acc, [curr]: getBestPowerPeriod(workoutData, curr) }), {});
	Object.values(periods).forEach(({ startIndex, endIndex, avgPower }) => {
		dispatch(storeAveragePower(getRangeHash([startIndex, endIndex]), avgPower));
	});

	return {
		type: types.CALCULATE_BEST_POWER_PERIODS,
		periods
	};
}

function getBestPowerPeriod(events, minDuration) {

	const msDuration = minDuration * 60 * 1000;

	if (events.length === 0 || events[events.length-1].millisecondOffset < msDuration) 
		return {
			startIndex: 0,
			endIndex: 0,
			avgPower: 0
		};

	const numDurationEvents = (msDuration / 1000) + 1; // number of data points to analyze in given segment
	let startIndex = 0;
	let endIndex = numDurationEvents;
	
	let newMaxPowerSum = events.slice(startIndex, endIndex).reduce((acc,curr) => acc + (curr.values.power ? curr.values.power : 0), 0);

	let maxPowerSum = newMaxPowerSum;
	let maxPowerStartIndex = startIndex;
	let maxPowerEndIndex = endIndex;

	while (endIndex < events.length - 1) {
		endIndex++;
		startIndex++;
		const addPowerValue = events[endIndex].values.power;
		const removePowerValue = events[startIndex-1].values.power;
		newMaxPowerSum = newMaxPowerSum + addPowerValue - removePowerValue;
		if (newMaxPowerSum > maxPowerSum) {
			maxPowerSum = newMaxPowerSum;
			maxPowerStartIndex = startIndex;
			maxPowerEndIndex = endIndex;
		};
	};

	return {
		startIndex: maxPowerStartIndex,
		endIndex: maxPowerEndIndex,
		avgPower: Math.floor((maxPowerSum / numDurationEvents) * 100) / 100
	};
};

function buildRouteData(workoutData) {
	return {
		type: types.BUILD_ROUTE_DATA,
		locations: getRouteData(workoutData)
	}
}

function getRouteData(workoutData) {
	const filteredWorkoutData = workoutData.filter(dataPoint => (dataPoint.values.positionLat && dataPoint.values.positionLong));
	return filteredWorkoutData.map(dataPoint => {
		const { positionLat, positionLong } = dataPoint.values;
		return [ positionLong, positionLat ];
	});	
}

const highlightRoute = ([ startIndex, endIndex  ]) => {
	if (!startIndex || !endIndex) 
		return handleSelectorOption(types.ENTIRE_MINUTES);
	return {
		type: types.HIGHLIGHT_ROUTE,
		startIndex,
		endIndex
	};
};

const clearHighlightRoute = () => {
	return {
		type: types.CLEAR_HIGHLIGHT_ROUTE
	}
}

const setSelectorOption = (selectorOption) => {
	return {
		type: types.SET_SELECTOR_OPTION,
		option: selectorOption
	};
}

const storeAveragePower = (rangeHash, value)  => {
	return {
		type: types.SET_SEGMENT_AVERAGE_POWER,
		rangeHash,
		value
	};
}


