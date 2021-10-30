import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css'

interface CalendarProps {
    from: Date | undefined,
    setFrom: (date: Date) => void,
    setTo: (date: Date) => void,
    to: Date | undefined,
    minDate?: Date | undefined,
    maxDate?: Date | undefined
}

const Calendar: React.FC<CalendarProps> = ({ from, setTo, setFrom, to, minDate, maxDate }) => {

    return (
        <div className="calDiv">
            <span>From:</span>
            <DatePicker
                selected={from}
                onChange={(date: Date) => setFrom(date)}
                selectsStart
                startDate={from}
                endDate={to}
                minDate={minDate}
                maxDate={maxDate}
            />
            <span>To:</span>
            <DatePicker
                selected={to}
                onChange={(date: Date) => setTo(date)}
                selectsEnd
                startDate={from}
                endDate={to}
                minDate={from}
                maxDate={maxDate}
            />
        </div>
    );
}

export default Calendar;