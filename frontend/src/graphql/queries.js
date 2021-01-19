import { gql } from 'apollo-boost'

export const MARKER_QUERY = gql`
  query markers (
    $username: String!
  ) {
    markers(
        username: $username
        title: $title
        coordinates: $coordinates
        description: $description
    ) {
        username: $username
        title: $title
        coordinates: $coordinates
        description: $description
    }
  }
`