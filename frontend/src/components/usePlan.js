import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks'

import {
//     // for query
//     MARKER_QUERY,
//     PLAN_QUERY,
    USERNAME_QUERY,
    USERPLAN_QUERY,
    PLAN_SUBSCRIPTION
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
    const {data:planList, error, subscribeToMore} = useQuery(USERPLAN_QUERY, {variables:{_userId:_userId}})
    const {data:usernameData} = useQuery(USERNAME_QUERY, {variables:{_id:_userId}})
    const username = usernameData? usernameData.Username : ""
    const plan = planList? planList.UserPlan : []
    useEffect(()=>{
        subscribeToMore({
            document: PLAN_SUBSCRIPTION,
            variables: {username: username},
            updateQuery: (prev, { subscriptionData }) => {
                const newData = subscriptionData.data.subscribePlan
                switch(newData.mutation){
                    case "NEW":
                        return {...prev, UserPlan:[...prev.UserPlan, newData.data]}
                    break
                    case "DELETE":
                        const newArray = prev.UserPlan.filter(e=>e._id !== newData.data._id)
                        return {...prev, UserPlan:newArray}
                    break
                    case "UPDATE":
                        return {...prev, "UserPlan":newData.data.spots}
                    break
                    default:
                        console.log(`Warning: unknown mutation ${newData.mutation}`)
                    break
                }
            }
        })
    }, [username, subscribeToMore])
    return {plan, error, username}
}