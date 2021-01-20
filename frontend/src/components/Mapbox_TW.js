import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks'
import mapboxgl from "mapbox-gl";
import { Button } from 'antd';
import "./site.css"

import {
// for query
MARKER_QUERY,
// for mutation
ADD_MARKER_MUTATION,
// DELETE_MARKER_MUTATION,
// UPDATE_MARKER_MUTATION,
// for subscription
} from '../graphql'

mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcnRoZXJjdWxlcyIsImEiOiJja2p6Z3NmaTEwN2RkMnNtZmVwdDdvb3N1In0.-qqamKKJShiY2mZm8EoOxA';

const MapBox = ({username, markerCallback}) => {
    
    const [View, setView] = useState({
        lng: 121.55,
        lat: 25.05,
        zoom: 12
    })
    const { subscribeMarker, ...markers } = useQuery(
        MARKER_QUERY,
        { variables: { username: username } }
        )
    const [addMarker] = useMutation(ADD_MARKER_MUTATION)


    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const [currentMarker, setCurrentMarker] = useState(null);
    const [test, setTest] = useState(0);

    useEffect(() => {
        const initializeMap = ({ setMap, mapContainer}) => {
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

            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        }
        if (!map) initializeMap({ setMap, mapContainer});
    }, [map]);

    if(map){
        const clickPoint = async (e) => {
            if(currentMarker) currentMarker.remove()

            var popup = new mapboxgl.Popup()
            .setHTML('<h3>A point</h3>');

            var marker = new mapboxgl.Marker()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .setPopup(popup)
            .addTo(map)
            
            setCurrentMarker(marker)
            markerCallback(marker)
        };
        map.once('click', clickPoint);
    }

    // useEffect(()=>{
    //     if(map){
    //         const markerRecord = markers.data.Marker
    //         if (markers !== "undefined"){
    //             for (let index = 0; index < markerRecord.length; index++) {
    //                 var popup = new mapboxgl.Popup()
    //                 .setHTML('<h3>title</h3>');
    //                 var marker = new mapboxgl.Marker()
    //                 .setLngLat([markerRecord[index].geometry.coordinates.lng, markerRecord[index].geometry.coordinates.lat])
    //                 .setPopup(popup)
    //                 .addTo(map);         
    //             }
    //         }
    //     }
    // }, [username])

    return (
        <div>
            <div className='sidebarStyle'>
                <div>Longitude: {View.lng} | Latitude: {View.lat} | Zoom: {View.zoom} </div>
            </div>
            <Button style={{position: "relative", right: "0px"}}>+</Button>
            <div ref={el => (mapContainer.current = el)} className='mapContainer' />
        </div>)
}

export default MapBox