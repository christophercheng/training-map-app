import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

export const workoutData = (state = [], action) => {
	switch (action.type) {
		case types.STORE_WORKOUT_DATA:
			return action.workoutData;
		default:
			return state;
	}
};

const bestPowerPeriods = (state = {}, action) => {
	switch (action.type) {
		case types.CALCULATE_BEST_POWER_PERIODS:
			return action.periods;
		default:
			return state;
	}
};

const mapEnhancers = (state = {}, action) => {
	switch (action.type) {
		case types.HIGHLIGHT_ROUTE:
			const { startIndex, endIndex } = action;
			return {
				...state,
				highlightedRoute: {
					startIndex,
					endIndex
				}
			};
		case types.CLEAR_HIGHLIGHT_ROUTE:
			const { highlightedRoute, ...filteredState } = state;
			return filteredState;
		default:
			return state;
	}
};

const selectorOption = (state = { option: types.ENTIRE_MINUTES }, action) => {
	switch (action.type) {
		case types.SET_SELECTOR_OPTION:
			return {
				option: action.option
			};
		default:
			return state;
	}
};
 
const routeCoordinates = (state = [], action) => {
	switch (action.type) {
		case types.BUILD_ROUTE_DATA:
			return action.locations;
		default:
			return state;
	}
};

const averagePower = (state = {}, action) => {
	switch (action.type) {
		case types.SET_SEGMENT_AVERAGE_POWER:
			return {
				...state,
				[action.rangeHash]: action.value
			}
		default:
			return state;
	}
}

export default combineReducers({
 bestPowerPeriods,
 mapEnhancers,
 selectorOption,
 workoutData,
 routeCoordinates,
 averagePower
});
