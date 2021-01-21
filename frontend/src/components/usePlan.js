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
                var newArray
                const prev_item = prev ? prev.UserPlan : []
                switch(newData.mutation){
                    case "NEW":
                        return {UserPlan:[...prev_item, newData.data]}
                    break
                    case "DELETE":
                        newArray = prev.UserPlan.filter(e=>e._id !== newData.data._id)
                        return {UserPlan:newArray}
                    break
                    case "UPDATE":
                        newArray = prev.UserPlan.map(e=>{
                            if(e.title !== newData.data.title)
                                return e
                            console.log(newData)
                            return newData.data
                        })
                        return {"UserPlan":newArray}
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