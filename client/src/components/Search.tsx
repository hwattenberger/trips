import React, { ChangeEvent, useEffect, useState, useMemo } from 'react'
import axios from "axios";

import { Input } from "./../styles/general";
import StaticPointOnMap from './maps/StaticPointOnMap';
import './Search.css';
import debounce from 'lodash.debounce';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { LocationI } from './../utility/types';

interface SearchProps {
    setLocation: (newLoc: MapboxGeocoder.Result) => void,
    location: LocationI | null
}

interface SearchObject {
    string: string,
    object: MapboxGeocoder.Result | null
}

const defaultSearch = {
    string: "",
    object: null
}

const axiosSettings = {
    params: {
        access_token: "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg",
        // country: "CN",
        language: "en",
        types: "country,region,postcode,district,place,locality,neighborhood,address"
    }
}

export const Search: React.FC<SearchProps> = ({ setLocation, location }) => {
    const [searchStr, setSearchStr] = useState<string>("");
    const [searchOptions, setSearchOptions] = useState<MapboxGeocoder.Result[]>([]);

    useEffect(() => {
        return () => debounceSearch.cancel();
    }, [])

    useEffect(() => {
        if (!searchStr && location && location.place_name) setSearchStr(location.place_name);
    }, [location])

    const search = (currentSearch: String) => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${currentSearch}.json`, axiosSettings)
            .then((res) => {
                console.log(res);
                setSearchOptions(res.data.features);
            })
    }

    const debounceSearch = useMemo(() => {
        return debounce((newValue) => search(newValue), 500);
    }, [])

    const onSearchStringChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchStr(newValue)
        debounceSearch(newValue);
    }

    const onClickSelectMap = (ix: number) => {
        setSearchStr(searchOptions[ix].place_name);
        setLocation(searchOptions[ix]);
        setSearchOptions([]);
    }

    return (
        <div className="searchBox">
            <div className="searchInput">
                <label>Location:
                    <Input type="text" id="search" name="search" width="100%" placeholder="Search" onChange={onSearchStringChange} value={searchStr} autoComplete="off" />
                </label>
            </div>
            {searchOptions.map((result, ix) => (
                <div className="searchResult" key={result.id} onClick={() => onClickSelectMap(ix)}>
                    {result.place_name}
                </div>
            ))}
            {searchOptions.length > 0 && !location && <StaticPointOnMap lng={searchOptions[0].center[0]} lat={searchOptions[0].center[1]} />}
            {location && <StaticPointOnMap lng={location.center[0]} lat={location.center[1]} />}
        </div>
    );
}