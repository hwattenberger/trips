import React, { useState, useEffect } from 'react';
import { Button, Card, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import mainImg from './../../images/mainpic.jpg';
import mainImg2 from './../../images/mainpic2.jpg';
import mainImg3 from './../../images/mainpic3.jpg';
import mainImg4 from './../../images/mainpic4.jpg';

import styled from 'styled-components';

import { GET_FEATURED_TRIPS } from './../../query/query';

interface LandingMainImageProps {
    imgUrl: string;
}

interface featuredTripI {
    _id: string;
    tripName: string;
    dayLength: Number
}

export const LandingMainImage = styled.div<LandingMainImageProps>`
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${(props) => props.imgUrl}');
    background-size: cover;
    background-position: center;
    border-radius: 72px;
    display: grid;
    align-content: center;
    justify-content: center;
    text-align: center;
    height: 514px;
    margin-top: 20px;
`

const imgArr = [mainImg, mainImg2, mainImg3, mainImg4];

interface LandingProps {

}

const Landing: React.FC<LandingProps> = () => {
    const [scrollImgNum, setScrollImgNum] = useState(0);
    const getFeaturedTrips = useQuery(GET_FEATURED_TRIPS);

    useEffect(() => {
        const interval = setInterval(() => {
            setScrollImgNum(num => {
                if (num === imgArr.length - 1) return 0;
                else return num + 1;
            });
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    if (getFeaturedTrips.loading) return null;

    return (
        <main>
            <LandingMainImage imgUrl={imgArr[scrollImgNum]}>
                <div className="landingStarterDivText">
                    <h1>Share Trip Experiences</h1>
                    <h2>Get Travel Inspiration</h2>
                </div>
            </LandingMainImage>
            <div className="landingSearch">
                <Link to={`/register`}><Button variant="contained">Sign Up</Button></Link>
            </div>
            <div>
                <h2>See Great Trips</h2>
                <Grid container justifyContent="center" spacing={2}>
                    {getFeaturedTrips.data && getFeaturedTrips.data.findFeaturedTrips.map((trip: featuredTripI, ix: number) => (
                        <Grid key={trip._id} item>
                            <Link to={`/trips/${trip._id}`}>
                                <Card sx={{ width: 200, backgroundColor: '#98c1d9', textAlign: 'center', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h3>{trip.tripName}</h3>
                                    {trip.dayLength} {trip.dayLength === 1 ? 'day' : 'days'}
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
            {/* <div>
                <h2>Great Trips</h2>
                <div className="featuredTripsDiv">
                    {getFeaturedTrips.data && getFeaturedTrips.data.findFeaturedTrips.map((trip: featuredTripI, ix: number) => (
                        <Link to={`/trips/${trip._id}`}>
                            <Card sx={{ maxWidth: 275, textAlign: 'center', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3>{trip.tripName}</h3>
                                {trip.dayLength} {trip.dayLength === 1 ? 'day' : 'days'}
                            </Card>
                        </Link>
                    ))}
                </div>
            </div> */}

        </main>
    );
}

export default Landing;