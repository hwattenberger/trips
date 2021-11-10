import React, { ChangeEvent, useEffect, useState } from 'react'

import Calendar from "./Calendar"
import { Input } from "./../styles/general"
import { Search } from './Search';
import { NewActivity } from './NewActivity';
import TripMapOnClick from './maps/TripMapOnClick';
import Activity from './Activity';

import { LegI, ActivityI, LocationI } from './../utility/types';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Rating } from '@mui/material';

interface NewLegProps {
    startDt: Date | undefined,
    endDt: Date | undefined,
    legInfo: LegI,
    updateLeg: (updatedLeg: LegI) => void,
    ix: number
}

const NewLeg: React.FC<NewLegProps> = ({ startDt, endDt, updateLeg, ix, legInfo }) => {
    const [openSearch, setOpenSearch] = useState(false);
    const [tempLocation, setTempLocation] = useState<MapboxGeocoder.Result | undefined | null>();

    useEffect(() => {
        setLegFrom(startDt);
    }, [startDt]);

    const openDialog = () => {
        setOpenSearch(true);
    }

    const handleClose = () => {
        setOpenSearch(false);
        setTempLocation(null);
    }

    const acceptAndClose = () => {
        if (tempLocation) setLocation(tempLocation);
        setOpenSearch(false);
        setTempLocation(null);
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateLeg({ ...legInfo, [e.target.name]: e.target.value });
    }

    const setLegFrom = (val: Date | undefined) => {
        updateLeg({ ...legInfo, "legFrom": val });
    }

    const setLegTo = (val: Date | undefined) => {
        updateLeg({ ...legInfo, "legTo": val });
    }

    const createActivity = (newActivity: ActivityI) => {
        updateLeg({ ...legInfo, activities: [...legInfo.activities, newActivity] });
    }

    const setLocation = (newLocation: MapboxGeocoder.Result) => {
        let country_short_code = "";
        const updatedLoc: LocationI = {
            place_name: newLocation.place_name,
            center: [...newLocation.center],
            mapboxId: newLocation.id,
            bbox: [...newLocation.bbox]
        }

        //Not a country
        if (newLocation.context) {
            for (let i = 0; i < newLocation.context.length && !country_short_code; i++) {
                if (newLocation.context[i].id.includes("country")) country_short_code = newLocation.context[i].short_code;
            }
        }
        //A country already
        else if (newLocation.properties) country_short_code = newLocation.properties.short_code

        if (country_short_code) updatedLoc.country_short_code = country_short_code;

        console.log("location", updatedLoc)
        updateLeg({ ...legInfo, "location": updatedLoc });
    }

    const activityIcon = (type: string): string => {
        if (type === "poi") return "🏰";
        if (type === "food") return "🍜";
        return "⛵";
    }

    return (
        <div className="newTripLegDiv">
            <h2>Leg {ix + 1}</h2>
            <div className="tripForm">
                <Search setLocation={setLocation} location={legInfo.location} />
                Can't find the location?  <span className="clickToOpenClickMap" onClick={openDialog}>Find it on a map.</span>
                <div className="formRow">
                    <Calendar from={legInfo.legFrom} to={legInfo.legTo} setFrom={setLegFrom} setTo={setLegTo} minDate={startDt} maxDate={endDt} />
                </div>
                <div className="formRow">
                    <label>
                        Description:
                        <div><textarea id="comments" name="comments" rows={3} placeholder="Details on this leg of the trip" value={legInfo.comments} onChange={onInputChange} /></div>
                    </label>
                </div>
                <div className="formRow">
                    Activities:
                    {legInfo.activities.length === 0 && <div>- None (add activities below)</div>}
                    {legInfo.activities.map((activity) => (
                        <Activity key={activity._id} activity={activity} />
                    ))}
                    <NewActivity createActivity={createActivity} />
                </div>
            </div>
            <Dialog
                open={openSearch}
                sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%' } }}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Where did you travel? (Left click on the spot)"}
                </DialogTitle>
                <DialogContent>
                    <TripMapOnClick setTempLocation={setTempLocation} />
                    {tempLocation && tempLocation.place_name}
                </DialogContent>
                <DialogActions>
                    {tempLocation && <Button onClick={acceptAndClose}>Accept</Button>}
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewLeg;