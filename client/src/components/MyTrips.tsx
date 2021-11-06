import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_TRIPS } from './../query/query';

interface MyTripsProps {

}

const MyTrips: React.FC<MyTripsProps> = ({ }) => {
    const { loading, error, data } = useQuery(GET_MY_TRIPS);

    return (
        <div>
            Test
        </div>
    );
}

export default MyTrips;