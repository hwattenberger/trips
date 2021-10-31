import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container } from '@mui/material';

// import styled from 'styled-components';
// import dayjs from 'dayjs';

import { Input } from "./../styles/general"

import Calendar from './Calendar';
import NewLeg from './NewLeg';
import { NewTravelBetween } from './NewTravelBetween';

interface Trip {
    tripName: string,
    dayLength: number,
    description: string,
    legs: Leg[]
}

export interface Leg {
    location: Location | null,
    legFrom: Date | undefined,
    legTo: Date | undefined,
    comments: string,
    rating: number,
    activities: Activity[],
    travelAfter: TravelBetween
}

export interface Location {
    place_name: string,
    center: number[],
    mapboxId: string | number | undefined,
    bbox: number[],
    country_short_code?: string
}

export interface Activity {
    type: string,
    place: string,
    rating: number | null,
    comments: string
}

export interface TravelBetween {
    method: string,
    comments: string
}

const emptyTrip = {
    tripName: "",
    dayLength: 0,
    description: "",
    legs: []
}

const emptyLeg = {
    location: null,
    legFrom: undefined,
    legTo: undefined,
    comments: "",
    rating: 0,
    activities: [],
    travelAfter: {
        method: "",
        comments: ""
    }
}

export const NewTrip: React.FC = () => {
    const [tripInfo, setTripInfo] = useState<Trip>(emptyTrip);
    const [from, setFrom] = useState<Date | undefined>();
    const [to, setTo] = useState<Date | undefined>();
    const [legs, setLegs] = useState<Leg[]>([]);

    const createFirstLeg = () => {
        if (from && legs.length === 0) setLegs([emptyLeg]);
    }


    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setTripInfo({ ...tripInfo, [e.target.name]: e.target.value });
    }

    const updateLeg = (ix: number, newLeg: Leg) => {
        const newLegs = [...legs];
        newLegs[ix] = newLeg;

        //Add another leg if needed
        if (ix === newLegs.length - 1 && newLeg.legTo && !to) newLegs[ix + 1] = emptyLeg;
        if (ix === newLegs.length - 1 && newLeg.legTo && to && newLeg.legTo < to) newLegs[ix + 1] = emptyLeg;

        setLegs([...newLegs])
    }

    return (
        <Container maxWidth="md">
            <h1>Create Trip</h1>
            <div className="tripForm">
                <div className="formRow">
                    <label>Trip Name:
                        <Input type="text" id="tripName" name="tripName" width="30rem" value={tripInfo.tripName} onChange={onInputChange} />
                    </label>
                </div>
                <div className="formRow">
                    <Calendar from={from} to={to} setFrom={setFrom} setTo={setTo} />
                </div>
                <div className="formRow">
                    <label>
                        Trip Description:
                        <div><textarea id="description" name="description" rows={3} placeholder="Any details you'd like to provide on your overall trip" value={tripInfo.description} onChange={onInputChange} /></div>
                    </label>
                </div>
                {!from && legs.length === 0 && <Button variant="contained" size="small" onClick={createFirstLeg} disabled>Next</Button>}
                {from && legs.length === 0 && <Button variant="contained" size="small" onClick={createFirstLeg}>Next</Button>}
                {legs.map((leg, ix) => (
                    <div key={ix}>
                        <NewLeg startDt={from} endDt={to} ix={ix} updateLeg={(newLeg) => updateLeg(ix, newLeg)} legInfo={legs[ix]} />
                        {ix !== legs.length - 1 && <NewTravelBetween updateLeg={(newLeg) => updateLeg(ix, newLeg)} legInfo={legs[ix]} />}
                    </div>
                ))}
                {legs.length !== 0 && <Button variant="contained" size="small" onClick={createFirstLeg}>Save Trip</Button>}
            </div>
        </Container>
    );
}