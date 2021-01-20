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
MARKERS_SUBSCRIPTION
} from '../graphql'

mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcnRoZXJjdWxlcyIsImEiOiJja2p6Z3NmaTEwN2RkMnNtZmVwdDdvb3N1In0.-qqamKKJShiY2mZm8EoOxA';

const MapBox = ({username, markerCallback, currentMarkerContent}) => {
    
    const [View, setView] = useState({
        lng: 121.55,
        lat: 25.05,
        zoom: 12
    })
    const { subscribeMarker, ...markers } = useQuery(
        MARKER_QUERY,
        { variables: { username: username } }
        )
    const [insertionMode, setInsertionMode] = useState(false)


    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const {data, subscribeToMore} = useQuery(MARKER_QUERY, {variables:{username: username}})

    const [currentMarker, _setCurrentMarker] = useState(null);
    const setCurrentMarker = e => {_setCurrentMarker(e); markerCallback(e);} 
    const [test, setTest] = useState(0);
    const [markerLoaded, setMarkerLoaded] = useState(false);

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

    useEffect(()=>{
        if(map && insertionMode){
            const clickPoint = (e) => {
                if(currentMarker) currentMarker.remove()

                var marker = new mapboxgl.Marker()
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .addTo(map)
                
                setCurrentMarker(marker)
            };
            map.once('click', clickPoint);
            return ()=>{map.off('click', clickPoint);}
        }
        else if(map && !insertionMode && currentMarker){
            currentMarker.remove()
            setCurrentMarker(null)
        }
    }, [map, insertionMode, currentMarker]);

    if(map && data && !markerLoaded){
        setMarkerLoaded(true)
        data.Marker.map(e=>{
            const linLat = e.geometry.coordinates
            var popup = new mapboxgl.Popup()
            .setHTML(`<h3>${e.properties.title}<h3><p>${e.properties.description}</p>`);

            var marker = new mapboxgl.Marker()
            .setLngLat(linLat)
            .setPopup(popup)
            .addTo(map)
        })
    }

    useEffect(()=>{
        if(!subscribeToMore || !map) return;
        subscribeToMore({
            document: MARKERS_SUBSCRIPTION,
            variables: {username: username},
            updateQuery: (prev, { subscriptionData }) => {
                const newData = subscriptionData.data.subscribeMarker
                switch(newData.mutation){
                    case "NEW":
                        const linLat = newData.data.geometry.coordinates
                        var popup = new mapboxgl.Popup()
                        .setHTML(`<h3>${newData.data.properties.title}<h3><p>${newData.data.properties.description}</p>`);

                        var marker = new mapboxgl.Marker()
                        .setLngLat(linLat)
                        .setPopup(popup)
                        .addTo(map)
                    break
                    default:
                        console.log(`Warning: unknown mutation ${newData.mutation}`)
                    break
                }
            }
        })
    }, [map])

    const buttonOnclick = () => {
        setInsertionMode(!insertionMode)
    }
    const color = insertionMode? "green" : "white"
    return (
        <div>
            <div className='sidebarStyle'>
                <div>Longitude: {View.lng} | Latitude: {View.lat} | Zoom: {View.zoom} </div>
            </div>
            <Button style={{position: "relative", right: "0px","background-color":color}}
             onClick={buttonOnclick}>+</Button>
            <div ref={el => (mapContainer.current = el)} className='mapContainer' />
        </div>)
}

export default MapBox