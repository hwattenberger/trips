import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useQuery } from '@apollo/client';
import { GET_TRIP_INFO, GET_TRIP_LOCATIONS } from './../query/query'
import { TripMap } from './maps/TripMap';
import TravelBetween from './TravelBetween';
import styled from 'styled-components';
import { LegI } from '../utility/types';
import Activity from './Activity';

import { InView } from 'react-intersection-observer';

import { Container, Grid } from '@mui/material';

const Header = styled.h1`
    margin: 40px 0px 0px 0px;
`;

const Subtitle = styled.p`
    margin: 0px;
    font-style: italic;
`;

const Trip: React.FC = () => {
    const { tripId } = useParams<{ tripId?: string }>();
    const { loading, data } = useQuery(GET_TRIP_INFO, { variables: { idOfTrip: tripId } });
    const locationQuery = useQuery(GET_TRIP_LOCATIONS, { variables: { idOfTrip: tripId } });
    const [center, setCenter] = useState<number[]>();

    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        if (data && data.findTripById && data.findTripById.legs[0] && data.findTripById.legs[0].location.center) setCenter(data.findTripById.legs[0].location.center);
    }, [data])

    const startDate = () => {
        return `${monthArr[data.findTripById.startMonth - 1]}`
    }

    const updateMap = (inView: boolean, leg: LegI) => {
        if (inView && leg.location && leg.location.center) setCenter(leg.location.center);
    }

    if (loading || locationQuery.loading) return <>Loading</>
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Header>{data.findTripById.tripName}{data.findTripById.dayLength && ` - ${data.findTripById.dayLength} days`}</Header>
                    <Subtitle>{startDate()}, {data.findTripById.startYear}</Subtitle>
                    {data.findTripById.description && <p>{data.findTripById.description}</p>}
                </Grid>
                <Grid item xs={12} md={4}>
                    {center && <TripMap center={center} locations={locationQuery.data.findTripById.legs} />}
                </Grid>
                <Grid item xs={12} md={8}>
                    {data.findTripById.legs.map((leg: LegI, ix: number) => (
                        <InView as="div" key={leg._id} onChange={(inView) => updateMap(inView, leg)}>
                            <div className="newTripLegDiv establishedTripLegDiv">
                                <h2>Leg {ix + 1} {leg.location && <>- {leg.location.place_name}</>}</h2>
                                {leg.endDay && <Subtitle>Day {leg.startDay} to Day {leg.endDay}</Subtitle>}
                                {!leg.endDay && <Subtitle>From day {leg.startDay}. Ongoing.</Subtitle>}
                                <div className="legComments">
                                    {leg.comments && <> {leg.comments}</>}
                                </div>
                                <div>
                                    {leg.activities.map((activity) => (
                                        <Activity key={activity._id} activity={activity} />
                                    ))}
                                </div>
                            </div>
                            <TravelBetween leg={leg} />
                        </InView>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}

export default Trip;