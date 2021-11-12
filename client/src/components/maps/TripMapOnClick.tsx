import React, { useRef, useEffect } from 'react'
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './TripMap.css'

mapboxgl.accessToken = "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg";

interface TripMapProps {
    setTempLocation: React.Dispatch<React.SetStateAction<MapboxGeocoder.Result | null | undefined>>;
}

const axiosSettings = {
    params: {
        access_token: mapboxgl.accessToken,
        language: "en",
        types: "postcode,place"
    }
}

const TripMapOnClick: React.FC<TripMapProps> = ({ setTempLocation }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<null | mapboxgl.Map>(null);
    const marker = useRef<null | mapboxgl.Marker>();

    useEffect(() => {
        const lat = 42.35;
        const lng = -70.9;

        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container:
                mapContainer.current === undefined || mapContainer.current === null ? "" : mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 3
        });

        marker.current = new mapboxgl.Marker({
            color: '#00000'
        }).setLngLat([lng, lat])
            .addTo(map.current)

        map.current.on('click', (e) => {
            if (!map.current) return;
            const lngLat = e.lngLat;
            if (marker.current) marker.current.setLngLat([lngLat.lng, lngLat.lat])

            const currentZoom = map.current.getZoom();
            let newZoom = 5;

            //Zoom into 5 if it's more zoomed out than 5
            if (currentZoom > 5) newZoom = currentZoom;
            map.current.flyTo({
                center: [lngLat.lng, lngLat.lat],
                zoom: newZoom
            })

            search(lngLat.lng, lngLat.lat)
        })

    }, []); // eslint-disable-line

    const search = (lng: number, lat: number) => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`, axiosSettings)
            .then((res) => {
                setTempLocation(res.data.features[0]);
            })
    }

    return (
        <div className="mapOnClick">
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default TripMapOnClick;