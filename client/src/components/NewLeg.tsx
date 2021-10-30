import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from "axios";

import { TripMap } from './TripMap';
import Calendar from "./Calendar"
import { Input } from "./../styles/general"
import { Search } from './Search';

interface NewLegProps {
    startDt: Date | undefined,
    endDt: Date | undefined
}

const emptyLeg = {
    comments: "",
    rating: 0
}

const NewLeg: React.FC<NewLegProps> = ({ startDt, endDt }) => {
    const [tripFrom, setTripFrom] = useState<Date | undefined>(startDt);
    const [tripTo, setTripTo] = useState<Date | undefined>();
    const [legInfo, setLegInfo] = useState(emptyLeg);
    const [location, setLocation] = useState("");

    useEffect(() => {
        setTripFrom(startDt);
    }, [startDt]);


    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setLegInfo({ ...legInfo, [e.target.name]: e.target.value });
    }

    // const onLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setLocation(e.target.value);
    //     if (e.target.value.length > 3) search();
    // }

    return (
        <div className="newTripLegDiv">
            <h2>Leg 1</h2>
            <div className="tripForm">
                {/* <div className="formRow"> */}
                <Search />
                {/* </div> */}
                <div className="formRow">
                    <Calendar from={tripFrom} to={tripTo} setFrom={setTripFrom} setTo={setTripTo} minDate={startDt} maxDate={endDt} />
                </div>
                <div className="formRow">
                    <label>
                        Description:
                        <div><textarea id="comments" name="comments" rows={3} placeholder="Details on this leg of the trip" value={legInfo.comments} onChange={onInputChange} /></div>
                    </label>
                </div>
            </div>
            {/* <TripMap /> */}
        </div>
    );
}

export default NewLeg;