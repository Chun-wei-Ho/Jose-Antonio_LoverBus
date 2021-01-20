import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks'

import {
//     // for query
//     MARKER_QUERY,
//     PLAN_QUERY,
    // USERNAME_QUERY,
    USERPLAN_QUERY,
    PLAN_SUBSECTION
    // SIGNIN_QUERY,
//     // for mutation
//     ADD_MARKER_MUTATION,
//     DELETE_MARKER_MUTATION,
//     UPDATE_MARKER_MUTATION,
//     NEW_PLAN_MUTATION,
//     RENAME_PLAN_MUTATION,
//     DELETE_PLAN_MUTATION,
//     NEW_SPOT_MUTATION,
//     delete_Spot_MUTATION,
//     UPDATE_SPOTSTARTTIME_MUTATION,
//     UPDATE_SPOTENDTIME_MUTATION,
    // SIGNUP_MUTATION
//     // for subscription
  } from '../graphql'

export default function usePlan(_userId){
    const {data:planList, error} = useQuery(USERPLAN_QUERY, {variables:{_userId:_userId}})
    const plan = planList? planList.UserPlan : []
    return {plan, error}
}