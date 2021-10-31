import React, { ChangeEvent, useEffect } from 'react'

import Calendar from "./Calendar"
import { Input } from "./../styles/general"
import { Search } from './Search';
import { NewActivity } from './NewActivity';

import { Activity, Leg, Location } from './NewTrip';

interface NewLegProps {
    startDt: Date | undefined,
    endDt: Date | undefined,
    legInfo: Leg,
    updateLeg: (updatedLeg: Leg) => void,
    ix: number
}

// const emptyLeg = {
//     comments: "",
//     rating: 0
// }

const NewLeg: React.FC<NewLegProps> = ({ startDt, endDt, updateLeg, ix, legInfo }) => {

    // const [location, setLocation] = useState("");

    useEffect(() => {
        setLegFrom(startDt);
    }, [startDt]);


    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateLeg({ ...legInfo, [e.target.name]: e.target.value });
    }

    const setLegFrom = (val: Date | undefined) => {
        updateLeg({ ...legInfo, "legFrom": val });
    }

    const setLegTo = (val: Date | undefined) => {
        updateLeg({ ...legInfo, "legTo": val });
    }

    const createActivity = (newActivity: Activity) => {
        updateLeg({ ...legInfo, activities: [...legInfo.activities, newActivity] });
    }

    const setLocation = (newLocation: MapboxGeocoder.Result) => {
        let country_short_code = "";
        const updatedLoc: Location = {
            place_name: newLocation.place_name,
            center: [...newLocation.center],
            mapboxId: newLocation.id,
            bbox: [...newLocation.bbox]
        }

        for (let i = 0; i < newLocation.context.length && !country_short_code; i++) {
            if (newLocation.context[i].id.includes("country")) country_short_code = newLocation.context[i].short_code;
        }
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
                    {legInfo.activities.map((activity, ix) => (
                        <div key={ix}>{activityIcon(activity.type)} - {activity.place}</div>
                    ))}
                    <NewActivity createActivity={createActivity} />
                </div>
            </div>
        </div>
    );
}

export default NewLeg;