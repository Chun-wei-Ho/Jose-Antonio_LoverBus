import { gql } from 'apollo-boost'

export const MARKERS_SUBSCRIPTION = gql`
  subscription marker (
    $username: String!
  ) {
    marker (
      data: {
        username: $username
        properties: $properties
        geometry: $geometry
      }
    ) {
      mutation
      data {
        username
        properties
        geometry
      }
    }
  }
`
