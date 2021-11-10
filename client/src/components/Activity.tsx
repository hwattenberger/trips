import React from 'react'
import { Rating } from '@mui/material';
import { ActivityI } from './../utility/types';

interface ActivityProps {
    activity: ActivityI
}

const Activity: React.FC<ActivityProps> = ({ activity }) => {

    const activityIcon = (type: string): string => {
        if (type === "poi") return "🏰";
        if (type === "food") return "🍜";
        return "⛵";
    }

    return (
        <div className="acceptedActivity">
            <div className="activityLine1">
                {activityIcon(activity.type)} {activity.place}
                <Rating name="rating" value={activity.rating} disabled className="ratingRight" />
            </div>
            <div>
                {activity.comments}
            </div>
        </div>
    );
}

export default Activity;