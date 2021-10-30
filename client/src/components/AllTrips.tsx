import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from "react-router-dom";
import { GET_TRIPS } from '../query/query';

interface trip {
    _id: string,
    tripName: string
}

const AllTrips: React.FC = () => {
    const result = useQuery(GET_TRIPS);

    if (result.loading) return <>"Loading"</>;

    return (
        <div>
            All Trips
            {result.data.allTrips.map((trip: trip) => (
                <div key={trip._id}>
                    {trip.tripName} -
                    <Link to={`/trips/${trip._id}`}>details</Link>
                </div>
            ))}
        </div>
    );
}

export default AllTrips;