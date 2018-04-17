import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Polyline } from "react-google-maps";

let drawOthers=(props)=>{
  return props.users.map((x, i)=>{
    console.log(x)
    return <Marker key = {i} position={{ lat: x.lat, lng: x.long }} />
  })
}

let test=()=>{console.log('zoommmmmmmmmm')}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    zoom={18}
    defaultOptions = {{disableDefaultUI:true, draggable:false}}
    center={{ lat: props.myLat || 47.6062, lng: props.myLong || -122.335167 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 47.6062, lng: -122.335167 }} />}
    {drawOthers(props)}
    <Polyline path={[{  lat: 47.6062, lng: -122.335167 },
      {  lat: 47.6060, lng: -122.335167 }]} />
  </GoogleMap>

))


export default MyMapComponent;
