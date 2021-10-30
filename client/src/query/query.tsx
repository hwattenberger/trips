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
      description
      user {
      username
      }
      legs {
      _id
      startDay
      endDay
      location {
          country {
          number
          name
          }
          city
          place
          lat
          long
      }
      comments
      rating
      activity {
          day
          comments
          rating
          place
          type
          _id
      }
      accommodations {
          name
          type
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


