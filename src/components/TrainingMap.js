import DeckGL, { PathLayer } from "deck.gl"
import MapGL, {NavigationControl} from 'react-map-gl';
import React, { Component } from 'react';

const mapboxApiAccessToken
  = "pk.eyJ1IjoiY2hyaXNoY2hlbmciLCJhIjoiY2ptbzdmbHV0MTFrZTN2cDU5anB6NmdpaSJ9.WEj6j08F35R1r9iKVcbnFg";

export class Map extends Component {
  constructor(props) {
    super(props);
    const length = Math.floor(this.props.routeCoordinates.length / 2);
    const [ centerLong, centerLat ] = this.props.routeCoordinates[length];

    this.state = {
      viewPort: {
        width: 800,
        height: 500,
        latitude: centerLat,
        longitude: centerLong,
        zoom: 11,
        pitch: 0,
        bearing: 0
      }
    };
  }

  navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  };

  onViewPortChange = vp => {
    this.setState({
      ...this.state,
      viewPort: vp
    })
  };

  render = () => {
    const data = [{
      path: this.props.routeCoordinates,
      name: 'what',
    }];

    const layers = [];

    layers.push(new PathLayer({
        id: 'line-layer',
        data,
        pickable: true,
        widthScale: 1,
        widthMinPixels: 5,
        getColor: [0,0,255],
        rounded: false,
        opacity: 1
      }));

    if (this.props.highlightedRoute) {
      const { startIndex, endIndex } = this.props.highlightedRoute;
      const highlightedData = [{
        path: this.props.routeCoordinates.slice(startIndex, endIndex),
        name: 'what',
      }];    
      layers.push(new PathLayer({
          id: 'highlighted-line-layer',
          data: highlightedData,
          pickable: true,
          widthScale: 2,
          widthMinPixels: 15,
          getColor: [0,255,50],
          rounded: true,
          opacity: .2
        }));
    }

    return (
      <MapGL
        {...this.state.viewPort}
        mapStyle="mapbox://styles/mapbox/outdoors-v10"
        mapboxApiAccessToken={mapboxApiAccessToken}
        onViewportChange={this.onViewportChange}
      >
        <div className="nav" style={this.navStyle}>
            <NavigationControl />
        </div>
        <DeckGL
          {...this.state.viewPort}
          controller={true}
          layers={layers}
          onViewportChange={this.onViewportChange}
        />
      </MapGL>
    );
  }
}