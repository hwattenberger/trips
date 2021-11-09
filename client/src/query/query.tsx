import { gql } from '@apollo/client'

export const GET_TRIP_INFO = gql`
query getTripInfo($idOfTrip: String!) {
  findTripById(_id: $idOfTrip) {
    _id
    startMonth
    startDay
    startYear
    tripName
    dayLength
    user {
      username
    }
    description
    legs {
      _id
      startDay
      endDay
      location {
        countryShortCode
        bbox
        mapboxId
        center
        place_name
      }
      activities {
        _id
        type
        place
        rating
        comments
        day
      }
      comments
      rating
      travelAfter {
        comments
        method
      }
    }
  }
}
`

export const GET_TRIP_LOCATIONS = gql`
query getLocationMapInfo($idOfTrip: String!) {
  findTripById(_id: $idOfTrip) {
    legs {
      location {
        countryShortCode
        bbox
        mapboxId
        center
        place_name
      }
    }
  }
}
`

export const GET_TRIPS = gql`
  query {
  allTrips {
    _id
    tripName
    dayLength
    user {
      username
      _id
    }
  }
}
`

export const CHECK_TOKEN = gql`
  query {
  checkToken {
    hasToken
  }
}
`

export const GET_MY_TRIPS = gql`
  query {
    findMyTrips {
      _id
      tripName
      startMonth
      startDay
      startYear
      description
  }
}
`

export const GET_FEATURED_TRIPS = gql`
  query {
  findFeaturedTrips {
    _id
    tripName
    dayLength
  }
}
`

export const EDIT_TRIP = gql`
  mutation TripUpdateMutation($input: TripInput) {
  tripUpdate(input: $input) {
    _id
  }
}
`

export const CREATE_TRIP = gql`
  mutation TripCreateMutation($input: TripInput) {
  tripCreate(input: $input) {
    _id
  }
}
`

export const LOGIN = gql`
  mutation Mutation($input: LoginInput) {
  login(input: $input) {
    value
  }
}
`

export const CREATE_USER = gql`
  mutation Mutation($input: UserInput) {
    userCreate(input: $input) {
      value
  }
}
`