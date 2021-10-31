import React from 'react'

import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

import { Leg } from './NewTrip';

interface NewTravelBetweenProps {
    legInfo: Leg,
    updateLeg: (updatedLeg: Leg) => void,
}

export const NewTravelBetween: React.FC<NewTravelBetweenProps> = ({ updateLeg, legInfo }) => {

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const travelAfter = { ...legInfo.travelAfter, [e.target.name]: e.target.value }
        updateLeg({ ...legInfo, travelAfter: travelAfter })
    }

    return (
        <div className="newTripTravelBetween">
            <h2>Travel Between</h2>
            <div className="formRow">
                <Select value={legInfo.travelAfter.method} name="method" size="small" onChange={onInputChange}>
                    <MenuItem value="plane">✈ Plane</MenuItem>
                    <MenuItem value="train">🚅 Train</MenuItem>
                    <MenuItem value="car">🚗 Car</MenuItem>
                    <MenuItem value="boat">🚢 Boat</MenuItem>
                    <MenuItem value="other">🚀 Other</MenuItem>
                </Select>
            </div>
            <div className="formRow">
                <label>
                    Comments:
                    <div><textarea id="comments" name="comments" rows={3} value={legInfo.travelAfter.comments} onChange={onInputChange} /></div>
                </label>
            </div>
        </div>
    );
}