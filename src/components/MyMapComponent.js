import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Polyline } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: props.myLat || 47.6062, lng: props.myLong || -122.335167 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 47.6062, lng: -122.335167 }} />}
    <Polyline path={[{  lat: 47.6062, lng: -122.335167 },
      {  lat: 47.2062, lng: -122.335167 }]} />
  </GoogleMap>

))

export default MyMapComponent;
