import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import "./TW.css"

import mapboxgl from 'mapbox-gl';
import "./site.css"

mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcnRoZXJjdWxlcyIsImEiOiJja2p6Z3NmaTEwN2RkMnNtZmVwdDdvb3N1In0.-qqamKKJShiY2mZm8EoOxA';

export default class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 121.55,
      lat: 25.05,
      zoom: 12
    };
  }
   
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
   
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }
   
  render() {
    return (
      <div>
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}
  
// const MapBox = () => {
//     return ( 	
//       <MapContainer center={[25.014947, 121.535549]} zoom={18} scrollWheelZoom={false} className="map"
//       style={{position: 'relative', overflow: 'hidden'}}>
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[25.014947, 121.535549]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//       )
//   }

// export default MapBox
