import React, { useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './TripMap.css'

mapboxgl.accessToken = "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg";

interface TripMapProps {
    lat: number,
    lng: number
}

// interface latLng {
//     lat: number,
//     lng: number
// }

const StaticPointOnMap: React.FC<TripMapProps> = ({ lng, lat }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<null | mapboxgl.Map>(null);
    const marker = useRef<null | mapboxgl.Marker>();

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container:
                mapContainer.current === undefined || mapContainer.current === null ? "" : mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 5
        });

        marker.current = new mapboxgl.Marker({
            color: '#00000',
        }).setLngLat([lng, lat])
            .addTo(map.current)

    }, []); // eslint-disable-line

    useEffect(() => {
        if (map.current) {
            map.current.flyTo({
                center: [lng, lat]
            })

            if (marker.current) marker.current.setLngLat([lng, lat])
        }
    }, [lat, lng]) // eslint-disable-line



    return (
        <div className="mapSinglePoint">
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default StaticPointOnMap;