import { gql } from 'apollo-boost'

export const MARKERS_SUBSCRIPTION = gql`
subscription subscribeMarker ($username: String!) {
    subscribeMarker (username: $username) {
        mutation
        data {
            username
            properties{
                title
                description
            }
            geometry{
                coordinates
            }
        }
    }
}
`
