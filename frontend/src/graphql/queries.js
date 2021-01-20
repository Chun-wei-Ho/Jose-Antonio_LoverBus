import { gql } from 'apollo-boost'

export const MARKER_QUERY = gql`
  query Marker (
    $username: String!
  ) {
    Marker(
        username: $username
    ){
      username
      properties{
        
      }
      geometry
      _id        
    }
  }
`
// return [Marker!]!

export const USERPLAN_QUERY = gql`
  query UserPlan (
    $username: String!
  ) {
    UserPlan(
        username: $username
    ){
      username
      title
      spots
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