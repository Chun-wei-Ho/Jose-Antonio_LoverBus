import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./site.css"

mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcnRoZXJjdWxlcyIsImEiOiJja2p6Z3NmaTEwN2RkMnNtZmVwdDdvb3N1In0.-qqamKKJShiY2mZm8EoOxA';

const MapBox = () => {

  const [View, setView] = useState({
    lng: 121.55,
    lat: 25.05,
    zoom: 12
  })
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const [clicklngLat, setClicklngLat] = useState([]);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [View.lng, View.lat],
        zoom: View.zoom
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      map.on('click', clickPoint);
      function clickPoint(e){
        setClicklngLat([e.lngLat.lng, e.lngLat.lat])
        console.log(e.lngLat)
        console.log(clicklngLat)
        var popup = new mapboxgl.Popup()
        .setHTML('<h3>A point</h3>');
        
        var marker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .setPopup(popup)
        .addTo(map);  
      };
    }
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);
  
  return (
    <div>
      <div className='sidebarStyle'>
        <div>Longitude: {View.lng} | Latitude: {View.lat} | Zoom: {View.zoom}</div>
      </div>
      <div ref={el => (mapContainer.current = el)} className='mapContainer'/>
    </div>
  )
}

export default MapBox