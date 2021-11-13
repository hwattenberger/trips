import React, { useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './TripMap.css'
import { LocationI } from './../../utility/types';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg";

interface TripMapProps {
    center: any,
    locations: LocationsI[],
    mapDisplay: string
}

interface LocationsI {
    location: LocationI
}

export const TripMap: React.FC<TripMapProps> = ({ center, locations, mapDisplay }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | undefined>();


    useEffect(() => {
        if (map) {
            map.flyTo({
                center: center,
                zoom: 8
            })
        }
    }, [center, mapDisplay]) // eslint-disable-line

    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container:
                mapContainer.current === undefined || mapContainer.current === null ? "" : mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: 3
        });

        const featureList: any = locations.map((loc) => {
            return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': loc.location.center
                },
                'properties': {
                    'location_name': loc.location.place_name
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
            })

            newMap.on('click', 'legLocations', (e: any) => {
                if (!e || !e.features) return "";
                const coordinates = e.features[0].geometry.coordinates.slice();
                const location_name = e.features[0].properties.location_name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(
                        `Location: ${location_name}`
                    )
                    .addTo(newMap);
            });

            newMap.on('mouseenter', 'legLocations', () => {
                newMap.getCanvas().style.cursor = 'pointer';
            });
            newMap.on('mouseleave', 'legLocations', () => {
                newMap.getCanvas().style.cursor = '';
            });


            setMap(newMap);
        })

        return () => newMap.remove();
    }, []); // eslint-disable-line

    return (
        <div className="mapMultiPoint">
            <div ref={mapContainer} className="map-container" />
            <span className="boldText">Displaying: {mapDisplay}</span>
        </div>
    );
}