import React from 'react';

export default function TourPlan(args){
    const plan = {
        title: "Baby Shark do do do",
        spots: [
            {
                _id: "",
                startTime: "Wed Feb 19 2020 10:52:00 GMT+0800",
                endTime: "Wed Feb 19 2020 22:52:00 GMT+0800",
                location: {
                        properties: {title: "National Taiwan University", description: "Largest Zoo in Taipei"},
                        geometry: {coordinates: [2,3]},
                        _id: ""
                    }
            },
            {
                _id: "",
                startTime: "Thu Feb 21 2020 10:52:00 GMT+0800",
                endTime: "Thu Feb 21 2020 22:52:00 GMT+0800",
                location: {
                        properties: {title: "National Kaohsiung University", description: "Moon lovers in Kaohsiung"},
                        geometry: {coordinates: [2,3]},
                        _id: ""
                    }
            }
            ],
        _id: ""
        }
    return (
        <React.Fragment>
        <h1> {plan.title} </h1>
        <table>
            <thead>
                <tr>
                    <td>title</td>
                    <td>description</td>
                    <td>time</td>
                </tr>
            </thead>
            <tbody>
                {plan.spots.map(e => (
                    <tr>
                        <td> {e.location.properties.title} </td>
                        <td> {e.location.properties.description} </td>
                        <td> {new Date(e.startTime).toLocaleString()}
                                - {new Date(e.endTime).toLocaleString()} <button onClick={()=>{}}> Edit </button> 
                                <button onClick={()=>{}}> Delete </button> </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </React.Fragment>
    )
}