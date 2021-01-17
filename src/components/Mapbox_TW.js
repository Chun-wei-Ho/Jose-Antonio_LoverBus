import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./TW.css"

const MapBox = () => {
    return ( 	
      <MapContainer center={[25.014947, 121.535549]} zoom={18} scrollWheelZoom={false} className="map"
      style={{position: 'relative', overflow: 'hidden'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[25.014947, 121.535549]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      )
  }

export default MapBox
