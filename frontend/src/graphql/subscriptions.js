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

export const PLAN_SUBSCRIPTION = gql`
subscription subscribePlan($username: String!)
{
  subscribePlan(username:$username){
    mutation
    data{
      username
      title
      spots{
        startTime
        endTime
        location{
          username
          properties{
            title
            description
          }
          geometry{
            coordinates
          }
          _id
        }
        _id
      }
      _id
    }
  }
}
`
