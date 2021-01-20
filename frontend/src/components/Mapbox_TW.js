import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks'
import mapboxgl from "mapbox-gl";
import { Button } from 'antd';
import "./site.css"

import {
    // for query
    MARKER_QUERY,
    // for mutation
    // ADD_MARKER_MUTATION,
    // DELETE_MARKER_MUTATION,
    // UPDATE_MARKER_MUTATION,
    // for subscription
  } from '../graphql'

mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcnRoZXJjdWxlcyIsImEiOiJja2p6Z3NmaTEwN2RkMnNtZmVwdDdvb3N1In0.-qqamKKJShiY2mZm8EoOxA';

const MapBox = ({username}) => {

  const [View, setView] = useState({
    lng: 121.55,
    lat: 25.05,
    zoom: 12
  })
  const { subscribeMarker, ...markers } = useQuery(
    MARKER_QUERY,
    { variables: { username: username } }
    // Marker data in result.data
  )
  console.log(markers.data)

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const [clicklnglat, setClicklnglat] = useState([0, 0]);
  const [test, setTest] = useState(0);

  useEffect(() => {
    const initializeMap = ({ setMap, setClicklnglat, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [View.lng, View.lat],
        zoom: View.zoom
      });

      map.on("move", () => {
        setView(map.getCenter().lng.toFixed(4), map.getCenter().lat.toFixed(4), map.getCenter().lat.toFixed(4))
        setTest(4)
      });

      const clickPoint = (e) => {
        setClicklnglat([e.lngLat.lng, e.lngLat.lat])
        //console.log([e.lngLat.lng, e.lngLat.lat])
        //console.log(clicklnglat)
        var popup = new mapboxgl.Popup()
          .setHTML('<h3>A point</h3>');

        var marker = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setPopup(popup)
          .addTo(map);
      };
      map.on('click', clickPoint);

      // console.log("dd", markers.data)
      // if (markers !== "undefined"){
      //   for (let index = 0; index < markers.data.length; index++) {
      //     var popup = new mapboxgl.Popup()
      //     .setHTML('<h3>title</h3>');
      //     var marker = new mapboxgl.Marker()
      //       .setLngLat([markers.data.geometry.coordinates.lng, markers.data.geometry.coordinates.lat])
      //       .setPopup(popup)
      //       .addTo(map);            
      //   }
      // }

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    }
    if (!map) initializeMap({ setMap, setClicklnglat, mapContainer });
  }, [map]);

  return (
    <div>
      <div className='sidebarStyle'>
        {/* <div>Longitude: {View.lng} | Latitude: {View.lat} | Zoom: {View.zoom}</div> */}
        <div>Longitude: {View.lng} | Latitude: {View.lat} | Zoom: {View.zoom} </div>
      </div>
      <Button style={{position: "relative", right: "0px"}}>+</Button>
      <div ref={el => (mapContainer.current = el)} className='mapContainer' />
    </div>
  )
}

export default MapBox