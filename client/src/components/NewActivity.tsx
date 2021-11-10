import React, { useState, ChangeEvent } from 'react'
import { Rating, Button, SelectChangeEvent } from '@mui/material';

import { ActivityI } from './../utility/types';

import { Input } from "./../styles/general"

interface NewActivityProps {
    createActivity: (newActivity: ActivityI) => void
    // setActivities: React.Dispatch<React.SetStateAction<Activity[]>>
}

const defaultActivity = {
    type: "",
    place: "",
    rating: 0,
    comments: "",
}

export const NewActivity: React.FC<NewActivityProps> = ({ createActivity }) => {
    const [newActivity, setNewActivity] = useState<ActivityI>(defaultActivity);

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

    const toggleType = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setNewActivity({ ...newActivity, type: e.currentTarget.name })
    }

    const isSelectedVariant = (type: string) => {
        if (type === newActivity.type) return "contained";
        return "outlined";
    }

    const allAddActivity = () => {
        if (newActivity.type && newActivity.place && newActivity.rating) return true;
        return false;
    }

    return (
        <div className="newActivity">
            <span className="boldText">Add Activity</span>
            <div className="formRow activityTopRow">
                {/* <span>Add Activity</span> */}
                <Button variant={isSelectedVariant("poi")} size="small" name="poi" onClick={toggleType}>🏰 Point of Interest</Button>
                <Button variant={isSelectedVariant("food")} size="small" name="food" onClick={toggleType}>🍜 Food</Button>
                <Button variant={isSelectedVariant("other")} size="small" name="other" onClick={toggleType}>⛵ Other Activity</Button>

                <Rating name="rating" value={newActivity.rating} onChange={onRatingChange} className="flexend" />
            </div>
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
            {allAddActivity() && <Button variant="contained" size="small" onClick={onClickAddActivity}>Add</Button>}
            {!allAddActivity() && <Button variant="contained" size="small" disabled onClick={onClickAddActivity}>Add</Button>}
        </div >
    );
}