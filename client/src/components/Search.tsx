import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from "axios";

import { Input } from "./../styles/general"
import { TripMap } from './TripMap';
import './Search.css'

interface SearchProps {

}

const defaultSearch = {
    string: "",
    object: null
}

export const Search: React.FC<SearchProps> = ({ }) => {
    const [searchStr, setSearchStr] = useState(defaultSearch);
    const [searchOptions, setSearchOptions] = useState([]);

    const search = () => {
        const axiosSettings = {
            params: {
                access_token: "pk.eyJ1IjoiaXdpc2hpaGFkIiwiYSI6ImNrdjJvejB4ZDBkb2cyb3A2bDY2YWY3eGoifQ.T-mys_-QQCK4CxmVnhiVxg",
                // country: "CN",
                language: "en",
                types: "country,region,postcode,district,place,locality,neighborhood,address"
            }
        }
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchStr.string}.json`, axiosSettings)
            .then((res) => {
                console.log(res);
                setSearchOptions(res.data.features);
            })
    }

    const onSearchStringChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchStr({ "string": e.target.value, "object": null });
        if (e.target.value.length > 3) search();
    }

    const onClickSelectMap = (ix: number) => {
        setSearchStr({ "string": searchOptions[ix].place_name, "object": searchOptions[ix] });
        setSearchOptions([]);
    }

    return (
        <div className="searchBox">
            <div className="searchInput">
                <label>Location:
                    <Input type="text" id="rating" name="rating" width="100%" value={searchStr.string} placeholder="Search" onChange={onSearchStringChange} />
                </label>
            </div>
            {searchOptions.map((result, ix) => (
                <div className="searchResult" key={result.id} onClick={() => onClickSelectMap(ix)}>
                    {result.place_name}
                </div>
            ))}
            {searchOptions.length > 0 && !searchStr.object && <TripMap lng={searchOptions[0].center[0]} lat={searchOptions[0].center[1]} />}
            {searchStr.object && <TripMap lng={searchStr.object.center[0]} lat={searchStr.object.center[1]} />}
        </div>
    );
}