import React, { useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './TripMap.css'

mapboxgl.accessToken = "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg";

interface TripMapProps {
    center: mapboxgl.LngLatLike,
    locations: TripMapLocation[]
}

interface TripMapLocation {
    center: mapboxgl.LngLatLike,
    place_name: string
}

export const TripMap: React.FC<TripMapProps> = ({ center, locations }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | undefined>();


    useEffect(() => {
        if (map) {
            map.flyTo({
                center: center,
                zoom: 8
            })
        }
    }, [center])

    useEffect(() => {
        // if (map) return; // initialize map only once
        const newMap = new mapboxgl.Map({
            container:
                mapContainer.current === undefined || mapContainer.current === null ? "" : mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: 3
        });

        const featureList = locations.map((loc) => {
            return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': loc.location.center
                }
            }
        })

        newMap.on('load', () => {
            newMap.addSource('legLocations', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featureList
                }
            })

            newMap.addLayer({
                'id': 'legLocations',
                'type': 'circle',
                'source': 'legLocations',
                'paint': {
                    'circle-color': '#ee6c4d',
                    'circle-radius': 10
                },
                // 'filter': ['==', '$type', 'Point']
            })

            setMap(newMap);
        })

        return () => newMap.remove();
    }, []);

    return (
        <div className="mapMultiPoint">
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}