import React from 'react'
import { Link } from "react-router-dom";
import { Card, Grid } from '@mui/material';

import { TripI } from './../utility/types';

interface TripCardProps {
    trip: TripI
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    return (
        <Grid key={trip._id} item>
            <Link to={`/trips/${trip._id}`}>
                <Card sx={{ width: 200, backgroundColor: '#98c1d9', textAlign: 'center', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2px' }}>
                    <h3>{trip.tripName}</h3>
                    {trip.dayLength} {trip.dayLength === 1 ? 'day' : 'days'}
                </Card>
            </Link>
        </Grid>
    );
}

export default TripCard;