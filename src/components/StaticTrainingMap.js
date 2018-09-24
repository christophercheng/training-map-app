import React, { PureComponent, Component } from 'react';

import {StaticMap } from 'react-map-gl';
import DeckGL, { PathLayer } from "deck.gl"

const mapboxApiAccessToken
  = "pk.eyJ1IjoiY2hyaXNoY2hlbmciLCJhIjoiY2ptbzdmbHV0MTFrZTN2cDU5anB6NmdpaSJ9.WEj6j08F35R1r9iKVcbnFg";

export class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [{
      path: this.props.routeCoordinates,
      name: 'what',
      color: [255, 0, 0]
    }];
    const layers = [
      new PathLayer({
        id: 'line-layer',
        data,
        pickable: true,
        widthScale: 20,
        widthMinPixels: 2,
      })
    ];

    const initialViewState = {
      width: 800,
      height: 400,
      latitude: this.props.centerLat,
      longitude: this.props.centerLong,
      zoom: 12,
      pitch: 0,
      bearing: 0
    };

    console.log('route data', data);

    return (
      <DeckGL
        width={800} height={400}
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
      >
        <StaticMap mapboxApiAccessToken={mapboxApiAccessToken} />
      </ DeckGL>
    );
  }
};
