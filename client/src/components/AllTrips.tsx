import React, { useState } from 'react';
import { useQuery } from '@apollo/client'
import { GET_TRIPS, GET_LOCATIONS_FOR_TRIPS } from '../query/query';
import { Grid } from '@mui/material';
import TripsOnMap from './maps/TripsOnMap';
import TripCard from './TripCard';

import { TripI } from './../utility/types';

const AllTrips: React.FC = () => {
    const result = useQuery(GET_TRIPS);
    const result2 = useQuery(GET_LOCATIONS_FOR_TRIPS);
    const [filterTripIds, setFilterTripIds] = useState();

    // useEffect(() => {
    //     if (result2.data) console.log("Result2", result2.data)
    // }, [result2])

    const showTripCard = (trip: TripI) => {
        if (!filterTripIds) return <TripCard trip={trip} key={trip._id} />
        else if (trip._id && filterTripIds[trip._id]) return <TripCard trip={trip} key={trip._id} />
        else return null;
    }

    if (result.loading || result2.loading) return <>Loading</>;

    if (result.error || result2.error) return <>Error</>;

    return (
        <div>
            <h1>All Trips</h1>
            <h2>Filter trips by leg locations:</h2>
            <TripsOnMap locations={result2.data.getLocationsforTrips} setFilterTripIds={setFilterTripIds} filterTripIds={filterTripIds} />
            <Grid container justifyContent="center" spacing={2}>
                {result.data.allTrips.map((trip: TripI) => showTripCard(trip))}
            </Grid>
        </div>
    );


}

export default AllTrips;