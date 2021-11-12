import React, { useState, useRef, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './TripMap.css'
import { Button } from '@mui/material';
import { Geometry, GeoJsonProperties, Feature } from "geojson";

mapboxgl.accessToken = "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg";

interface TripsOnMapProps {
    locations: TripLocationsI[],
    setFilterTripIds: React.Dispatch<React.SetStateAction<undefined>>,
    filterTripIds: any
}

interface TripLocationsI {
    _id: String,
    tripName: String,
    location_name: String,
    location_coord: Number[]
}

const TripsOnMap: React.FC<TripsOnMapProps> = ({ locations, setFilterTripIds, filterTripIds }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | undefined>();

    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container:
                mapContainer.current === undefined || mapContainer.current === null ? "" : mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 1
        });

        const featureList: any = locations.map((loc) => {
            return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': loc.location_coord
                },
                'properties': {
                    'id': loc._id,
                    'location_name': loc.location_name
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
                'cluster': true,
                'clusterMaxZoom': 14,
                'clusterRadius': 50
            })

            newMap.addLayer({
                'id': 'clusters',
                'type': 'circle',
                'source': 'tripLocations',
                'filter': ['has', 'point_count'],
                'paint': {
                    'circle-color': '#293241',
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                },
            })

            newMap.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'tripLocations',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#ee6c4d',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            setMap(newMap);
        })

        newMap.on('click', 'clusters', (e) => {
            const features: any = newMap.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            const clusterId = features[0]?.properties?.cluster_id;
            const source: any = newMap.getSource('tripLocations');
            source.getClusterExpansionZoom(
                clusterId,
                (err: string, zoom: number) => {
                    if (!err) {
                        newMap.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                }
            );
            source.getClusterLeaves(clusterId, features[0]?.properties?.point_count, 0, (err: any, features: Feature<Geometry, GeoJsonProperties>[]) => {
                if (!err) {
                    const filterIds: any = {};
                    features?.forEach((feature) => {
                        if (!feature.properties) return;
                        if (!filterIds[feature.properties.id]) filterIds[feature.properties.id] = 1;
                    })
                    setFilterTripIds(filterIds);
                }
            })
        });

        newMap.on('click', 'unclustered-point', (e: any) => {
            if (!e || !e.features) return "";
            const coordinates = e.features[0].geometry.coordinates.slice();
            const location_name = e.features[0].properties.location_name;
            const trip_id = e.features[0].properties.id;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                    `Location: ${location_name}<br>
                    <span class="mapboxPopupLink"><a href="/trips/${trip_id}">View Trip</a></span>`
                )
                .addTo(newMap);
        });

        newMap.on('mouseenter', 'clusters', () => {
            newMap.getCanvas().style.cursor = 'pointer';
        });
        newMap.on('mouseleave', 'clusters', () => {
            newMap.getCanvas().style.cursor = '';
        });

        newMap.on('mouseenter', 'unclustered-point', () => {
            newMap.getCanvas().style.cursor = 'pointer';
        });
        newMap.on('mouseleave', 'unclustered-point', () => {
            newMap.getCanvas().style.cursor = '';
        });

        return () => newMap.remove();
    }, []); // eslint-disable-line

    const onClickResetMap = () => {
        setFilterTripIds(undefined);
        map?.flyTo({
            zoom: 1
        })
    }

    return (
        <div className="mapAllTrips">
            <div ref={mapContainer} className="map-container" />
            {filterTripIds && <Button variant="contained" size="small" onClick={onClickResetMap} className="mapFilterBtn">Clear Filter</Button>}
        </div>
    );
}

export default TripsOnMap;