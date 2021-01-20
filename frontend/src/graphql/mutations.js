import { gql } from 'apollo-boost'

export const ADD_MARKER_MUTATION = gql`
  mutation addMarker(
    $username: String!
    $title: String!
    $coordinates: [Float!]!
    $description: String
  ) {
    addMarker(
      marker: {
        username: $username
        title: $title
        coordinates: $coordinates
        description: $description
      }
    )
  }
`

export const DELETE_MARKER_MUTATION = gql`
  mutation deleteMarker(
    $_id: ID!
  ) {
    deleteMarker(
      _id: $_id
    )
  }
`

export const UPDATE_MARKER_MUTATION = gql`
  mutation updateMarker(
    $_id: ID!
    $newTitle: String
    $newDescription: String
  ) {
    updateMarker(
      _id: $_id 
      newTitle: $newTitle
      newDescription: $newDescription
    )
  }
`

export const NEWPLAN_MUTATION = gql`
  mutation newPlan(
    $username: String!
    $title: String!
  ) {
    newPlan(
      username: $username
      title: $title
    )
  }
`
export const RENAME_PLAN_MUTATION = gql`
  mutation renamePlan(
    $_id: ID!
    $newTitle: String!
  ) {
    renamePlan(
      _id: $_id
      title: $newTitle
    ) {
      title
    }
  }
`

export const DELETE_PLAN_MUTATION = gql`
  mutation deletePlan(
    $_id: ID!
  ) {
    deletePlan(
      _id: $_id
    ) {
        username
        title
        coordinates
        description
    }
  }
`

export const NEWSPOT_MUTATION = gql`
  mutation newSpot(
    $planID: ID!
    $markerID: ID!
  ) {
    newSpot(
      planID: $planID
      markerID: $markerID
    ) {
      planID
      markerID
    }
  }
`
export const DELETE_SPOT_MUTATION = gql`
  mutation deleteSpot(
    $_id: ID!
  ) {
    deleteSpot(
      _id: $_id
    )
  }
`
export const UPDATE_SPOT_STARTTIME_MUTATION = gql`
  mutation updateSpotStartTime(
    $_id: ID!
    $time: String!
  ) {
    updateSpotStartTime(
      _id: $_id
      time: $time   
    ) {
      time
    }
  }
`
export const UPDATE_SPOT_ENDTIME_MUTATION = gql`
  mutation updateSpotEndTime(
    $_id: ID!
    $time: String!
  ) {
    addMarker(
      _id: $_id
      time: $time
    ) {
      time
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $username: String!
    $password: String!
  ) {
    signUp(
      username: $username
      password: $password
    )
  }
`

