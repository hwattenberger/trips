import React, { useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './TripMap.css'

mapboxgl.accessToken = "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg";

interface TripMapProps {
    lat: number,
    lng: number
}

interface latLng {
    lat: number,
    lng: number
}

export const TripMap: React.FC<TripMapProps> = ({ lng, lat }) => {
    const mapContainer = useRef<null | HTMLDivElement>(null);
    const map = useRef<null | mapboxgl.Map>(null);
    // const [lng, setLng] = useState(-70.9);
    // const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(5);
    const [point, setPoint] = useState<null | latLng>(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        const tempMark = new mapboxgl.Marker({
            color: '#00000',
            // draggable: true
        }).setLngLat([lng, lat])
            .addTo(map.current)

        // map.current.on('click', (e) => {
        //     console.log(e.lngLat)
        //     setPoint(e.lngLat);
        //     tempMark.setLngLat([e.lngLat.lng, e.lngLat.lat])
        // })

    }, []);

    useEffect(() => {
        if (map.current) {
            map.current.flyTo({
                center: [lng, lat]
            })
        }
    }, [lat, lng])



    return (
        <div className="mapSinglePoint">
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}