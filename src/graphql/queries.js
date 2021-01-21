import { gql } from 'apollo-boost'

export const USERNAME_QUERY = gql`
  query Username(
    $_id: ID!
  ) {
    Username(_id: $_id)
  }
`

export const MARKER_QUERY = gql`
  query Marker (
    $username: String!
  ) {
    Marker(
        username: $username
    ){
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
  }
`
// return [Marker!]!

export const USERPLAN_QUERY = gql`
  query UserPlan (
    $_userId: ID!
  ) {
    UserPlan(
        _userId: $_userId
    ){
    username
    title
    spots{
      _id
      startTime
      endTime
      location{
        properties{
          title
          description
        }
        geometry{
          coordinates
        }
        _id
      }
    }
    _id
  }
}
`
// return [Plan!]!

export const PLAN_QUERY = gql`
  query Plan (
    $_id: ID!
  ) {
    Plan(
        _id: $_id
    ){
      username
      title
      spots
      _id
    }
  }
`
// return Plan!

export const SIGNIN_QUERY = gql`
  query signIn (
    $username: String!
    $password: String!
  ) {
    signIn(
        username: $username
        password: $password
    )
  }
`
// return Boolean!