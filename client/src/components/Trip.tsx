import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useQuery } from '@apollo/client'
import { GET_TRIP_INFO, GET_TRIP_LOCATIONS } from './../query/query'
import { TripMap } from './TripMap';
import TravelBetween from './TravelBetween';
import styled from 'styled-components';
import { LegI } from '../utility/types';

import { InView } from 'react-intersection-observer';

import { Container, Box, Grid } from '@mui/material';

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
    const [center, setCenter] = useState();

    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        if (data && data.findTripById && data.findTripById.legs[0].location.center) setCenter(data.findTripById.legs[0].location.center);
    }, [data])

    const startDate = () => {
        return `${monthArr[data.findTripById.startMonth + 1]}`
    }

    const updateMap = (inView: boolean, leg: LegI) => {
        if (inView && leg.location && leg.location.center) setCenter(leg.location.center);
    }

    if (loading || locationQuery.loading) return <>Loading</>
    return (
        <Container>
            {/* // <Box sx={{ flexGrow: 1 }}> */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Header>{data.findTripById.tripName}{data.findTripById.dayLength && ` - ${data.findTripById.dayLength} days`}</Header>
                    <Subtitle>{startDate()}, {data.findTripById.startYear}</Subtitle>
                    {data.findTripById.description && <p>{data.findTripById.description}</p>}
                </Grid>
                <Grid item xs={12} md={4}>
                    {center && <TripMap center={center} locations={locationQuery.data.findTripById.legs} />}
                    {/* <TripMap lng={data.findTripById.legs[0].location.center[0]} lat={data.findTripById.legs[0].location.center[1]} locations={locationQuery.data.findTripById.legs} /> */}
                </Grid>
                <Grid item xs={12} md={8}>
                    {data.findTripById.legs.map((leg: LegI, ix: number) => (
                        <InView as="div" key={leg._id} onChange={(inView) => updateMap(inView, leg)}>
                            <div className="newTripLegDiv establishedTripLegDiv">
                                <h2>Leg {ix + 1} {leg.location && <>- {leg.location.place_name}</>}</h2>
                                <div>
                                    {/* {leg.location && <h3>Location - {leg.location.place_name}</h3>} */}
                                </div>
                                <div>
                                    {leg.comments && <> {leg.comments}</>}
                                </div>
                            </div>
                            <TravelBetween leg={leg} />
                        </InView>
                    ))}
                </Grid>
                {/* {JSON.stringify(data.findTripById)} */}
            </Grid>
            {/* // </Box> */}
        </Container>
    );

    // if (loading || locationQuery.loading) return <>Loading</>
    // return (
    //     <Container maxWidth="md">
    //         <Header>{data.findTripById.tripName}{data.findTripById.dayLength && ` - ${data.findTripById.dayLength} days`}</Header>
    //         <Subtitle>{startDate()}, {data.findTripById.startYear}</Subtitle>
    //         <TripMap lng={data.findTripById.legs[0].location.center[0]} lat={data.findTripById.legs[0].location.center[1]} locations={locationQuery.data.findTripById.legs} />
    //         {data.findTripById.description && <p>{data.findTripById.description}</p>}
    //         {data.findTripById.legs.map((leg: LegI, ix: number) => (
    //             <InView as="div" key={leg._id} onChange={(inView, entry) => console.log('Inview:', inView)}>
    //                 <div className="newTripLegDiv establishedTripLegDiv">
    //                     <h2>Leg {ix + 1} {leg.location && <>- {leg.location.place_name}</>}</h2>
    //                     <div>
    //                         {/* {leg.location && <h3>Location - {leg.location.place_name}</h3>} */}
    //                     </div>
    //                     <div>
    //                         {leg.comments && <> {leg.comments}</>}
    //                     </div>
    //                 </div>
    //                 <TravelBetween leg={leg} />
    //             </InView>
    //         ))}
    //         {/* {JSON.stringify(data.findTripById)} */}
    //     </Container>
    // );
}

export default Trip;