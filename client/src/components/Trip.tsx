import React from 'react';
import { useParams } from "react-router";
import { useQuery } from '@apollo/client'
import { GET_TRIP_INFO } from './../query/query'
import { TripMap } from './TripMap';
import styled from 'styled-components';

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
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const startDate = () => {
        return `${monthArr[data.findTripById.startMonth + 1]}`
    }

    if (loading) return <>Loading</>
    return (
        <div>
            <TripMap />
            <Header>{data.findTripById.tripName}{data.findTripById.dayLength && ` - ${data.findTripById.dayLength} days`}</Header>
            <Subtitle>{startDate()}, {data.findTripById.startYear}</Subtitle>
            {data.findTripById.description && <p>{data.findTripById.description}</p>}
        </div>
    );
}

export default Trip;