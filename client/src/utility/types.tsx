export interface TripI {
    _id?: string,
    tripName: string,
    dayLength: number,
    description: string,
    legs: [LegI] | []
}

export interface LegI {
    _id?: string,
    location: LocationI | null,
    legFrom: Date | undefined,
    legTo: Date | undefined,
    comments: string,
    rating: number,
    activities: ActivityI[],
    travelAfter: TravelBetweenI
}

export interface LocationI {
    place_name?: string,
    center?: number[],
    mapboxId?: string | number | undefined,
    bbox?: number[],
    country_short_code?: string
}

export interface ActivityI {
    _id?: string,
    type: string,
    place: string,
    rating: number | null,
    comments: string
}

export interface TravelBetweenI {
    method: string,
    comments: string
}