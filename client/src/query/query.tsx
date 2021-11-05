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
      activity {
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
    user {
      username
      _id
      email
    }
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
    username
  }
}
`