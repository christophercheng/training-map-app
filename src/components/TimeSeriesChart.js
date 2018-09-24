import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  Highlight
} from 'react-vis';

import '../../node_modules/react-vis/dist/style.css';

export class TimeSeriesChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectionStart: null,
      selectionEnd: null,
      enabledClearClick: false,
    };
  }

  updateDragState = area => {
    if (!area) return;
    if (area.left < 0) {
      area.left = 0;
    }
    if (area.right < 0) {
      area.right = 0;
    }
    if(this.props.maxRight && area.right > this.props.maxRight) {
      area.right = this.props.maxRight;
    }
    if(this.props.maxRight && area.left > this.props.maxRight) {
      area.left = this.props.maxRight;
    }
    const selectionStart =  area && Math.floor(area.left);
    const selectionEnd = area && Math.floor(area.right);
    this.setState({
      ...this.state,
      selectionStart,
      selectionEnd,
      enableClearClick: false
    });
    if (this.props.updateDragState){
      this.props.updateDragState(selectionStart, selectionEnd);
    }
  };

  clearHighlight = () => {
    if (this.props.updateDragState && this.state.enableClearClick) {
      this.props.updateDragState(null, null);
      this.setState({
        ...this.state,
        enableClearClick: false,
        selectionStart: null,
        selectionEnd: null
      })
    } else {
      this.setState({
        ...this.state,
        enableClearClick: true,
      })
    }
  }

  render() {
    const data = this.props.data.map(event => ({
        x: this.props.extractXfrom(event),
        y: this.props.extractYfrom(event)
      })
    );
    return (
      <div>
        <XYPlot width={800} height={300} onClick={this.clearHighlight}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis
            title="Minutes"
            tickTotal={Math.floor(this.props.data.length / 60 / 5) }
            tickFormat ={ (value) => Math.floor(value/1000/60) }
          />
          <YAxis title="Power" />
          <LineSeries
            data={data}
          />
          <Highlight
            color="#829AE3"
            drag
            enableY={false}
            onDrag={this.updateDragState}
            onDragEnd={this.updateDragState}
          />
        </XYPlot>
      </div>
    );
  }
}