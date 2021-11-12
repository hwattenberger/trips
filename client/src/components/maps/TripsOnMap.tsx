import React, { useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './TripMap.css'
import { LocationI } from './../../utility/types';

mapboxgl.accessToken = "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg";

interface TripsOnMapProps {
    locations: TripLocationsI[]
}

interface TripLocationsI {
    _id: String,
    tripName: String,
    location_name: String,
    location_coord: Number[]
}

const TripsOnMap: React.FC<TripsOnMapProps> = ({ locations }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | undefined>();

    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container:
                mapContainer.current === undefined || mapContainer.current === null ? "" : mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 1
        });

        const featureList = locations.map((loc) => {
            return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': loc.location_coord
                }
            }
        })

        newMap.on('load', () => {
            newMap.addSource('tripLocations', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featureList
                },
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            })

            newMap.addLayer({
                'id': 'clusters',
                'type': 'circle',
                'source': 'tripLocations',
                'paint': {
                    'circle-color': '#ee6c4d',
                    'circle-radius': 10
                },
            })

            setMap(newMap);
        })

        newMap.on('click', 'clusters', (e) => {
            const features = newMap.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            const clusterId = features[0].properties.cluster_id;
            newMap.getSource('tripLocations').getClusterExpansionZoom(
                clusterId,
                (err, zoom) => {
                    if (err) {
                        console.log("ERrr", err)
                        return;
                    }

                    newMap.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );
            // newMap.getSource('tripLocations').getClusterLeaves(clusterId, features[0].properties.point_count, 0, (err, features) => {
            //     if (!err) {
            //         console.log("Test", features)
            //     }
            // })
        });

        newMap.on('mouseenter', 'clusters', () => {
            newMap.getCanvas().style.cursor = 'pointer';
        });
        newMap.on('mouseleave', 'clusters', () => {
            newMap.getCanvas().style.cursor = '';
        });

        return () => newMap.remove();
    }, []);

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default TripsOnMap;