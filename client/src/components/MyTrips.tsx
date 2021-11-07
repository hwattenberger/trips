import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MY_TRIPS } from './../query/query';

interface MyTripsProps {

}

const MyTrips: React.FC<MyTripsProps> = ({ }) => {
    const { loading, error, data } = useQuery(GET_MY_TRIPS);

    if (loading) <>Loading...</>

    return (
        <div>
            <h1>My Trips</h1>
            {data && data.findMyTrips.map((trip) => (
                <div key={trip._id}>
                    {trip.tripName} - <Link to={`/trips/${trip._id}/edit`}>Edit</Link>
                </div>
            ))}
            {console.log(data)}
        </div>
    );
}

export default MyTrips;