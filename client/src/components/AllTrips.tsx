import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from "react-router-dom";
import { GET_TRIPS } from '../query/query';
import { Card, Grid } from '@mui/material';

import { TripI } from './../utility/types';

const AllTrips: React.FC = () => {
    const result = useQuery(GET_TRIPS);

    if (result.loading) return <>Loading</>;

    if (result.error) return <>Error</>;

    return (
        <div>
            <h1>All Trips</h1>
            <Grid container justifyContent="center" spacing={2}>
                {result.data.allTrips.map((trip: TripI) => (
                    <Grid key={trip._id} item>
                        <Link to={`/trips/${trip._id}`}>
                            <Card sx={{ width: 200, backgroundColor: '#98c1d9', textAlign: 'center', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2px' }}>
                                <h3>{trip.tripName}</h3>
                                {trip.dayLength} {trip.dayLength === 1 ? 'day' : 'days'}
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );


}

export default AllTrips;