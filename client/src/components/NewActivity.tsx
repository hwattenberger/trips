import React, { useState, ChangeEvent } from 'react'
import { Rating, Select, MenuItem, Button, SelectChangeEvent } from '@mui/material';
import { Activity } from './NewTrip';

import { Input } from "./../styles/general"

interface NewActivityProps {
    createActivity: (newActivity: Activity) => void
    // setActivities: React.Dispatch<React.SetStateAction<Activity[]>>
}

const defaultActivity = {
    type: "",
    place: "",
    rating: 0,
    comments: "",
}

export const NewActivity: React.FC<NewActivityProps> = ({ createActivity }) => {
    const [newActivity, setNewActivity] = useState<Activity>(defaultActivity);

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
    }

    const onRatingChange = (e: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        setNewActivity({ ...newActivity, "rating": newValue });
    }

    const onClickAddActivity = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!newActivity.type) {
            return null;
        }
        createActivity(newActivity);
        setNewActivity(defaultActivity);
    }

    const isButtonDisabled = () => {
        if (newActivity.type && newActivity.place) return null;
        return "disabled";
    }

    return (
        <div className="newActivity">
            Add Activity:
            <div className="formRow">
                <Select value={newActivity.type} name="type" size="small" onChange={onInputChange}>
                    <MenuItem value="poi">🏰 Point of Interest</MenuItem>
                    <MenuItem value="food">🍜 Food</MenuItem>
                    <MenuItem value="other">⛵ Other Activity</MenuItem>
                </Select>
                <Rating name="rating" value={newActivity.rating} onChange={onRatingChange} />
                <div className="formRow">
                    <label>Place:
                        <Input type="text" id="place" name="place" width="30rem" value={newActivity.place} onChange={onInputChange} autoComplete="off" />
                    </label>
                </div>
                <div className="formRow">
                    <label>
                        Comments:
                        <div><textarea id="comments" name="comments" rows={3} value={newActivity.comments} onChange={onInputChange} /></div>
                    </label>
                </div>
                {newActivity.type && newActivity.place && <Button variant="contained" size="small" onClick={onClickAddActivity}>Add</Button>}
                {(!newActivity.type || !newActivity.place) && <Button variant="contained" size="small" disabled onClick={onClickAddActivity}>Add</Button>}
            </div>
        </div >
    );
}