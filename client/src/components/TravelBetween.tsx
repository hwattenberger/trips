import { LegI } from '../utility/types';

interface TravelBetweenProps {
    leg: LegI
}

const TravelBetween: React.FC<TravelBetweenProps> = ({ leg }) => {

    const travelMethod = () => {
        switch (leg.travelAfter.method) {
            case 'plane':
                return "✈ Plane"
            case 'train':
                return "🚅 Train"
            case 'car':
                return "🚗 Car"
            case 'boat':
                return "🚢 Boat"
            case 'other':
                return "🚀 Other"
            default: return null;
        }
    }

    if (!leg.travelAfter || !leg.travelAfter.method) return null;

    return (
        <div className="newTripTravelBetween travelBetween">
            {travelMethod()}
            {leg.travelAfter.comments && <div>{leg.travelAfter.comments}</div>}
        </div>
    )
}

export default TravelBetween;