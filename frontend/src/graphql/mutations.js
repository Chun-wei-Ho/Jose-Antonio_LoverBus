import { gql } from 'apollo-boost'

export const ADD_MARKER_MUTATION = gql`
  mutation addMarker(
    $username: String!
    $title: String!
    $coordinates: [Float!]!
    $description: String
  ) {
    addMarker(
      data: {
        username: $username
        title: $title
        coordinates: $coordinates
        description: $description
      }
    ) {
        username
        title
        coordinates
        description
    }
  }
`
