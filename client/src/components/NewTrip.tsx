import React, { ChangeEvent, useState } from 'react'
import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';

import { CREATE_TRIP } from './../query/query'

import { Input } from "./../styles/general"
import { Button, Snackbar } from '@mui/material';

import Calendar from './Calendar';
import NewLeg from './NewLeg';
import NewTravelBetween from './NewTravelBetween';

import { LegI, TripI } from './../utility/types'

export interface LocationSaveServerI {
    place_name?: string,
    center?: [number, number],
    mapboxId?: string | number | undefined,
    bbox?: number[],
    country_short_code?: string,
    countryShortCode?: string
}

const emptyTrip: TripI = {
    tripName: "",
    dayLength: 0,
    description: "",
    legs: []
}

const emptyLeg: LegI = {
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
    const [tripInfo, setTripInfo] = useState<TripI>(emptyTrip);
    const [from, setFrom] = useState<Date | undefined>();
    const [to, setTo] = useState<Date | undefined>();
    const [legs, setLegs] = useState<LegI[]>([]);
    const [err, setErr] = useState("");
    const [open, setOpen] = useState(false);

    const [createTrip] = useMutation(CREATE_TRIP, {
        onError: (error) => {
            if (error.graphQLErrors[0]) setErr(error.graphQLErrors[0].message)
            else setErr("Saving message was not successful");
        }
    });

    const handleSnackClose = () => {
        setOpen(false);
    }

    const createFirstLeg = () => {
        if (from && legs.length === 0) setLegs([emptyLeg]);
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setTripInfo({ ...tripInfo, [e.target.name]: e.target.value });
    }

    const updateLeg = (ix: number, newLeg: LegI) => {
        const newLegs = [...legs];
        newLegs[ix] = newLeg;

        //Add another leg if needed
        if (ix === newLegs.length - 1 && newLeg.legTo && !to) newLegs[ix + 1] = emptyLeg;
        if (ix === newLegs.length - 1 && newLeg.legTo && to && newLeg.legTo < to) newLegs[ix + 1] = emptyLeg;

        setLegs([...newLegs])
    }

    const getLegStartDate = (ix: number): Date | undefined => {
        if (ix === 0) return from;
        return legs[ix - 1].legTo;
    }

    const validateDates = () => {

    }

    const onClickCreateTrip = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const startDtDayJs = dayjs(from);
        let dayLength;

        if (to) {
            dayLength = ((startDtDayJs.diff(to, 'day') * -1) + 1)
        }

        const createLegs = legs.map((leg: LegI) => {
            const updLocation: LocationSaveServerI = { ...leg.location };
            console.log("leg", leg)
            if (leg.location && leg.location.country_short_code) updLocation.countryShortCode = leg.location.country_short_code;
            delete updLocation.country_short_code;

            let startDayDiff;
            let endDayDiff;

            if (leg.legFrom) {
                startDayDiff = startDtDayJs.diff(leg.legFrom, 'day');
                startDayDiff = startDayDiff * -1;
            }
            if (leg.legTo) {
                endDayDiff = startDtDayJs.diff(leg.legTo, 'day');
                endDayDiff = endDayDiff * -1;
            }

            return {
                location: updLocation,
                comments: leg.comments,
                rating: leg.rating,
                travelAfter: leg.travelAfter,
                startDay: startDayDiff,
                endDay: endDayDiff,
                activities: leg.activities
            }
        })

        const createTripInput = {
            startMonth: startDtDayJs.month() + 1,
            startDay: startDtDayJs.date(),
            startYear: startDtDayJs.year(),
            tripName: tripInfo.tripName,
            dayLength: dayLength,
            description: tripInfo.description,
            legs: createLegs
        }
        console.log("test", createTripInput)
        createTrip({ variables: { input: createTripInput } });
        setErr("");
        setOpen(true);
    }

    return (
        <div>
            {err && <div>Error: {err}</div>}
            <h1>Create Trip</h1>
            <div className="tripForm">
                <div className="formRow">
                    <label>Trip Name:
                        <Input type="text" id="tripName" name="tripName" width="30rem" value={tripInfo.tripName} onChange={onInputChange} autoComplete="off" />
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
                        <NewLeg startDt={getLegStartDate(ix)} endDt={to} ix={ix} updateLeg={(newLeg) => updateLeg(ix, newLeg)} legInfo={legs[ix]} />
                        {ix !== legs.length - 1 && <NewTravelBetween updateLeg={(newLeg) => updateLeg(ix, newLeg)} legInfo={legs[ix]} />}
                    </div>
                ))}
                {legs.length !== 0 && <Button variant="contained" size="small" onClick={onClickCreateTrip}>Save Trip</Button>}
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Trip saved"
            />
        </div>
    );
}