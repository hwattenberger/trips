import React, { ChangeEvent, useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useParams } from "react-router";

import { EDIT_TRIP, GET_TRIP_INFO } from './../../query/query';

import { Input } from "./../../styles/general"
import { Button, Snackbar, Alert } from '@mui/material';

import Calendar from './../Calendar';
import NewLeg from './../NewLeg';
import NewTravelBetween from './../NewTravelBetween';

import { LegI, TripI, TravelBetweenI, ActivityI } from './../../utility/types';


export interface LocationSaveServerI {
    place_name?: string,
    center?: number[],
    mapboxId?: string | number | undefined,
    bbox?: number[],
    country_short_code?: string,
    countryShortCode?: string
}

export interface LegSaveServerI {
    _id: string,
    location: LocationSaveServerI,
    comments: string,
    rating: number,
    travelAfter: TravelBetweenI,
    startDay: number,
    endDay: number,
    activities: [ActivityI]
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

export const EditTrip: React.FC = () => {
    const [tripInfo, setTripInfo] = useState<TripI>(emptyTrip);
    const [from, setFrom] = useState<Date | undefined>();
    const [to, setTo] = useState<Date | undefined>();
    const [legs, setLegs] = useState<LegI[]>([]);
    const [err, setErr] = useState("");
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    const { tripId } = useParams<{ tripId?: string }>();
    const locationQuery = useQuery(GET_TRIP_INFO, { variables: { idOfTrip: tripId } });

    const [updateTrip] = useMutation(EDIT_TRIP, {
        onError: (error) => {
            if (error.graphQLErrors[0]) setErr(error.graphQLErrors[0].message)
            else setErr("Updating trip was not successful");
        }
    });

    useEffect(() => {
        if (locationQuery.data) {
            console.log("Trip", locationQuery.data.findTripById)

            const startDate = new Date(locationQuery.data.findTripById.startYear, locationQuery.data.findTripById.startMonth - 1, locationQuery.data.findTripById.startDay);
            setFrom(startDate);
            if (locationQuery.data.findTripById.dayLength) {
                const endDate = dayjs(startDate).add(locationQuery.data.findTripById.dayLength - 1, 'day');
                setTo(endDate.toDate());
            }

            const savedLegs: LegI[] = [];
            locationQuery.data.findTripById.legs.forEach((leg: LegSaveServerI) => {
                const legStartDay = dayjs(startDate).add(leg.startDay, 'day').toDate();
                let legEndDay;
                if (leg.endDay) legEndDay = dayjs(startDate).add(leg.endDay, 'day').toDate();

                const savedLeg: LegI = {
                    _id: leg._id,
                    comments: leg.comments,
                    rating: leg.rating,
                    legFrom: legStartDay,
                    legTo: legEndDay,
                    travelAfter: { method: leg.travelAfter.method, comments: leg.travelAfter.comments },
                    location: { ...leg.location },
                    activities: [...leg.activities]
                }

                savedLegs.push(savedLeg);
            })
            setLegs(savedLegs);

            const savedTrip: TripI = {
                _id: locationQuery.data.findTripById._id,
                tripName: locationQuery.data.findTripById.tripName,
                description: locationQuery.data.findTripById.description,
                dayLength: locationQuery.data.findTripById.dayLength,
                legs: []
            }
            setTripInfo(savedTrip);
        }
    }, [locationQuery]);

    const handleSnackClose = () => {
        setOpen(false);
    }

    const handleSnackErrorClose = () => {
        setOpenError(false);
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

    const validateDates = (): string | null => {
        if (!from) return "Please enter a trip from date";

        let prevDate = dayjs(from);

        if (!prevDate.isSame(legs[0].legFrom)) return "First leg should have from date of trip from date";

        for (let i = 0; i < legs.length; i++) {
            if (!legs[i].legFrom) return "All legs should have a from date"
            if (!prevDate.isSame(dayjs(legs[i].legFrom)) && !prevDate.isSame(dayjs(legs[i].legFrom).subtract(1, 'day'))) return "Leg from date should be the same day or the day after the last leg ended or the trip started"
            if (!legs[i].legTo && i !== legs.length - 1) return "All legs should have a to date";
            if (legs[i].legTo && dayjs(legs[i].legFrom).isAfter(legs[i].legTo)) return "For each leg, the from date must be before to date";
            prevDate = dayjs(legs[i].legTo);
        }
        if (to && !prevDate.isSame(to)) return "The to date of the last leg should equal to the to date of the trip";

        return null;
    }

    const validateTrip = () => {
        if (!tripInfo.tripName) return "Please enter a trip name";

        for (let leg of legs) {
            if (!leg.location?.place_name) return "Every leg must have a location";
        }

        return null;
    }

    const onClickUpdateTrip = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setErr("");

        let validationError = validateDates();
        if (!validationError) validationError = validateTrip();

        if (validationError) {
            setErr(validationError);
            setOpenError(true);
            return;
        }

        const startDtDayJs = dayjs(from);
        let dayLength;

        if (to) {
            dayLength = ((startDtDayJs.diff(to, 'day') * -1) + 1)
        }

        const createLegs = legs.map((leg: LegI) => {
            const updLocation: LocationSaveServerI = { ...leg.location };

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
                _id: leg._id,
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
            _id: tripInfo._id,
            startMonth: startDtDayJs.month() + 1,
            startDay: startDtDayJs.date(),
            startYear: startDtDayJs.year(),
            tripName: tripInfo.tripName,
            dayLength: dayLength,
            description: tripInfo.description,
            legs: createLegs
        }
        updateTrip({ variables: { input: createTripInput } });
        setOpen(true);
    }

    if (locationQuery.loading) return <>Loading...</>

    return (
        <div>
            <h1>Edit Trip</h1>
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
                {legs.length !== 0 && <Button variant="contained" size="small" onClick={onClickUpdateTrip}>Update Trip</Button>}
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Trip updated"
            />
            <Snackbar
                open={openError}
                autoHideDuration={8000}
                onClose={handleSnackErrorClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                <Alert onClose={handleSnackErrorClose} severity="error" sx={{ width: '100%' }}>{err}</Alert>
            </Snackbar>
        </div>
    );
}

export default EditTrip;