import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MY_TRIPS } from './../query/query';
import { Card, Grid, Button } from '@mui/material';

import { TripI } from './../utility/types';

interface MyTripsProps {

}

const MyTrips: React.FC<MyTripsProps> = ({ }) => {
    const { loading, data } = useQuery(GET_MY_TRIPS);

    if (loading) <>Loading...</>

    return (
        <div>
            <h1>My Trips</h1>
            <Grid container justifyContent="center" spacing={2}>
                {data && data.findMyTrips.map((trip: TripI) => (
                    <Grid key={trip._id} item>
                        {/* <Link to={`/trips/${trip._id}`}> */}
                        <Card sx={{ width: 200, backgroundColor: '#98c1d9', textAlign: 'center', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2px' }}>
                            <h3>{trip.tripName}</h3>
                            {trip.dayLength} {trip.dayLength === 1 ? 'day' : 'days'}
                            <div className="cardButtons">
                                <Link to={`/trips/${trip._id}`}><Button variant="outlined" size="small">View</Button></Link>
                                <Link to={`/trips/${trip._id}/edit`}><Button variant="outlined" size="small">Edit</Button></Link>
                            </div>
                        </Card>
                        {/* </Link> */}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default MyTrips;