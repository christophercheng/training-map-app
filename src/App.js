import React, { Component } from 'react';
import { connect } from "react-redux";

import * as types from "./constants/ActionTypes";
import { Analysis } from './components/Analysis';
import { fetchData, setInitialLocation } from "./api/workout-data";
import { getRangeHash } from "./utils";
import { initializeWorkoutData, handleSelectorOption } from "./actions";
import { Map } from './components/TrainingMap';
import { Selection } from './components/Selection';
import { TimeSeriesChart } from './components/TimeSeriesChart';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true
    }
  }
  componentDidMount() {
    const preProcessors = [ setInitialLocation ];
    fetchData("", preProcessors).then(processedData => {
      this.props.initializeWorkoutData(processedData);
      this.setState({
        loading: false
      });
    });
  }

  getAveragePower = () => {
    const { highlightedRoute } = this.props.mapEnhancers;
    const rangeHash = highlightedRoute
      ? getRangeHash([highlightedRoute.startIndex, highlightedRoute.endIndex])
      : getRangeHash([0,this.props.workoutData.length -1]);
    return this.props.averagePower[rangeHash];
  }

  render() {
    const { routeCoordinates, mapEnhancers, handleSelectorOption, selectorOption, workoutData } = this.props;
    return (
      <div className="App">
        { this.state.loading
          ? <span>loading...</span>
          : <div className="main-container">
              <div className="visualize-container">
                <Map
                  className="visualize-container--map"
                  routeCoordinates={ routeCoordinates}
                  highlightedRoute={ mapEnhancers.highlightedRoute }
                />
                <TimeSeriesChart 
                  data={workoutData}
                  extractYfrom={(event) => event.values.power}
                  extractXfrom={(event) => event.millisecondOffset}
                  maxRight = {workoutData[workoutData.length-1].millisecondOffset}
                  updateDragState = {(selectionStart,selectionEnd) => {
                      this.props.handleSelectorOption(
                        types.CUSTOM_MINUTES,
                        [ Math.floor(selectionStart/1000), Math.floor(selectionEnd/1000) ]
                      );
                    }
                  }
                />
              </div>
              <div className="selector-container">
                <Analysis
                  selected={selectorOption.option}
                  highlightedRoute={ mapEnhancers.highlightedRoute}
                  averagePower={this.getAveragePower()}
                />
                <Selection
                  className="selector-container--selection"
                  selected={selectorOption.option}
                  onSelection={option => handleSelectorOption(option.target.value)}
                />
              </div>
            </div>
         }
      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
});

const mapDispatchToProps = dispatch => ({
 initializeWorkoutData: data => dispatch(initializeWorkoutData(data)),
 handleSelectorOption: (option, range) => dispatch(handleSelectorOption(option, range))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
