import React from 'react'

import { SelectChangeEvent, Button } from '@mui/material';

import { LegI } from './../utility/types';

interface NewTravelBetweenProps {
    legInfo: LegI,
    updateLeg: (updatedLeg: LegI) => void,
}

const NewTravelBetween: React.FC<NewTravelBetweenProps> = ({ updateLeg, legInfo }) => {

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const travelAfter = { ...legInfo.travelAfter, [e.target.name]: e.target.value }
        updateLeg({ ...legInfo, travelAfter: travelAfter })
    }

    const isSelectedVariant = (type: string) => {
        if (type === legInfo.travelAfter.method) return "contained";
        return "outlined";
    }

    const toggleType = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const travelAfter = { ...legInfo.travelAfter, method: e.currentTarget.name }
        updateLeg({ ...legInfo, travelAfter: travelAfter })
    }

    return (
        <div className="newTripTravelBetween">
            <h2>Travel Between</h2>
            <div className="formRow travelBetweenBtnRow">
                <Button variant={isSelectedVariant("plane")} size="small" name="plane" onClick={toggleType}>✈ Plane</Button>
                <Button variant={isSelectedVariant("train")} size="small" name="train" onClick={toggleType}>🚅 Train</Button>
                <Button variant={isSelectedVariant("car")} size="small" name="car" onClick={toggleType}>🚗 Car</Button>
                <Button variant={isSelectedVariant("boat")} size="small" name="boat" onClick={toggleType}>🚢 Boat</Button>
                <Button variant={isSelectedVariant("other")} size="small" name="other" onClick={toggleType}>🚀 Other</Button>
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

export default NewTravelBetween;