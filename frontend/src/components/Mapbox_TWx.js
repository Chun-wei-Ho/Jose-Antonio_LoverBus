import React, { useState, useEffect} from 'react';
// import "./TW.css"

import mapboxgl from 'mapbox-gl';
import "./site.css"

mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcnRoZXJjdWxlcyIsImEiOiJja2p6Z3NmaTEwN2RkMnNtZmVwdDdvb3N1In0.-qqamKKJShiY2mZm8EoOxA';

const MapBox = () => {

  const [View, setView] = useState({
    lng: 121.55,
    lat: 25.05,
    zoom: 12
  })
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [View.lng, View.lat],
      zoom: View.zoom
    })
    
    map.on('move', () => {
      setView(map.getCenter().lng.toFixed(4), map.getCenter().lat.toFixed(4), map.getZoom().toFixed(2))
    })
  }, {})
  
  return (
    <div>
      <div className='sidebarStyle'>
        <div>Longitude: {View.lng} | Latitude: {View.lat} | Zoom: {View.zoom}</div>
      </div>
      <div ref={el => this.mapContainer = el} className='mapContainer' />
    </div>
  )
}

export default MapBox