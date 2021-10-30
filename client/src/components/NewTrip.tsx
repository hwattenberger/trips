import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import styled from 'styled-components';
import dayjs from 'dayjs';

import { Input } from "./../styles/general"

import Calendar from './Calendar';
import NewLeg from './NewLeg';

const emptyTrip = {
    tripName: "",
    dayLength: "",
    description: ""
}

export const NewTrip: React.FC = () => {
    const [tripInfo, setTripInfo] = useState(emptyTrip);
    const [from, setFrom] = useState<Date | undefined>();
    const [to, setTo] = useState<Date | undefined>();


    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setTripInfo({ ...tripInfo, [e.target.name]: e.target.value });
    }

    const updateDate = (from: Date, to: Date) => {
        console.log(from, to)
        // const date = e.target.value.split('-');
        // const updatedDate = {
        //     startYear: date[0],
        //     startMonth: date[1],
        //     startDay: date[2]
        // }
        // setTripInfo({ ...tripInfo, ...updatedDate });
    }

    return (
        <div>
            <h1>Create Trip</h1>
            <div className="tripForm">
                <div className="formRow">
                    <label>Trip Name:
                        <Input type="text" id="tripName" name="tripName" width="30rem" value={tripInfo.tripName} onChange={onInputChange} />
                    </label>
                </div>
                <div className="formRow">
                    <Calendar from={from} to={to} setFrom={setFrom} setTo={setTo} />
                    {/* <label>Start Date:
                        <Input type="date" id="startDate" name="startDate" value={dateValue()} onChange={onDateChange} />
                    </label>
                    <label>Length:
                        <Input type="text" id="dayLength" name="dayLength" width="2rem" value={tripInfo.dayLength} onChange={onInputChange} />
                        days
                    </label> */}
                </div>
                <div className="formRow">
                    <label>
                        Trip Description:
                        <div><textarea id="description" name="description" rows={3} placeholder="Any details you'd like to provide on your overall trip" value={tripInfo.description} onChange={onInputChange} /></div>
                    </label>
                </div>
                <NewLeg startDt={from} endDt={to} />
            </div>
        </div>
    );
}