import React, { useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './TripMap.css'

mapboxgl.accessToken = "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg";

interface TripMapProps {
    lat: number,
    lng: number,
    locations: TripMapLocation[]
}

interface TripMapLocation {
    center: number[],
    place_name: string
}

export const TripMap: React.FC<TripMapProps> = ({ lng, lat, locations }) => {
    const mapContainer = useRef<null | HTMLDivElement>(null);
    // const [map, setMap] = useState<null | mapboxgl.Map>();
    const markers = useRef<null | mapboxgl.Marker[]>([]);

    // const [zoom, setZoom] = useState(5);
    // const [point, setPoint] = useState<null | latLng>(null);

    useEffect(() => {
        // if (map) return; // initialize map only once
        const newMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 5
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
                // 'paint': {
                //     'fill-color': '#888888',
                //     'fill-opacity': 0.4
                // },
                // 'filter': ['==', '$type', 'Point']
            })

            // setMap(newMap);
        })

        return () => newMap.remove();
    }, []);

    return (
        <div className="mapSinglePoint">
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}