import React from 'react';
import { useParams } from "react-router";
import { useQuery } from '@apollo/client'
import { GET_TRIP_INFO, GET_TRIP_LOCATIONS } from './../query/query'
import { TripMap } from './TripMap';
import styled from 'styled-components';
import { LegI } from '../utility/types';

import { Container } from '@mui/material';

const Header = styled.h1`
    margin: 40px 0px 0px 0px;
`;

const Subtitle = styled.p`
    margin: 0px;
    font-style: italic;
`;

const Trip: React.FC = ({ }) => {
    const { tripId } = useParams();
    const { loading, error, data } = useQuery(GET_TRIP_INFO, { variables: { idOfTrip: tripId } });
    const locationQuery = useQuery(GET_TRIP_LOCATIONS, { variables: { idOfTrip: tripId } });
    // const { data: coordData } = useQuery(GET_TRIP_LOCATIONS, { variables: { idOfTrip: tripId } });
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const startDate = () => {
        return `${monthArr[data.findTripById.startMonth + 1]}`
    }

    console.log(locationQuery)

    if (loading || locationQuery.loading) return <>Loading</>
    return (
        <Container maxWidth="md">
            <Header>{data.findTripById.tripName}{data.findTripById.dayLength && ` - ${data.findTripById.dayLength} days`}</Header>
            <Subtitle>{startDate()}, {data.findTripById.startYear}</Subtitle>
            <TripMap lng={data.findTripById.legs[0].location.center[0]} lat={data.findTripById.legs[0].location.center[1]} locations={locationQuery.data.findTripById.legs} />
            {data.findTripById.description && <p>{data.findTripById.description}</p>}
            {data.findTripById.legs.map((leg: LegI, ix: number) => (
                <div key={leg._id}>
                    <div className="newTripLegDiv">
                        <h2>Leg {ix + 1} {leg.location && <>- {leg.location.place_name}</>}</h2>
                        <div>
                            {/* {leg.location && <h3>Location - {leg.location.place_name}</h3>} */}
                        </div>
                        <div>
                            {leg.comments && <> {leg.comments}</>}
                        </div>
                    </div>
                    <TravelBetween leg={leg} />
                </div>
            ))}
            {JSON.stringify(data.findTripById)}
        </Container>
    );
}

interface TravelBetweenProps {
    leg: LegI
}

const TravelBetween: React.FC<TravelBetweenProps> = ({ leg }) => {

    const travelMethod = () => {
        switch (leg.travelAfter.method) {
            case 'plane':
                return "✈ Plane"
                break;
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

export default Trip;