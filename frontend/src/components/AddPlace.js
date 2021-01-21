import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks'
import 'antd/dist/antd.css'
import { Input, Layout, Menu, Breadcrumb, Button, Card, Select } from 'antd';
import { TagOutlined, CheckOutlined} from '@ant-design/icons';
import SweetAlert from "react-bootstrap-sweetalert";
import usePlan from '../components/usePlan'

import {
// for query
// MARKER_QUERY,
// for mutation
ADD_MARKER_MUTATION,
DELETE_MARKER_MUTATION,
// UPDATE_MARKER_MUTATION,
NEWSPOT_MUTATION,
NEWPLAN_MUTATION,
// for subscription
} from '../graphql'

const { Header, Content, Footer, Sider } = Layout;

const AddPlace = ({username, currentMarker, setCurrentMarker, markerContentCallback, insertionMode, plan, title, setTitle, description, setDescription}) => {
  const setCurrentMarkerContent = e => { markerContentCallback(e);} 
  const [planId, setPlanId] = useState("")
  const [list1Value, setList1Value] = useState("")
  const [showList1, setshowList1] = useState(false)
  const [addSpot] = useMutation(NEWSPOT_MUTATION)
  const [deleteMarker] = useMutation(DELETE_MARKER_MUTATION)
  const [addMarker] = useMutation(ADD_MARKER_MUTATION)
  const deleteOnclick = () => {
    const marker_id = currentMarker._id
    deleteMarker({variables:{_id:marker_id}})
    currentMarker.remove()
    setCurrentMarker(null)
  }
  const onclick = async () => {
    if(!currentMarker) {
      alert("select a marker to add")
      return
    }
    if(title === ""){
      // alert("Please input a title")
      // return
      setTitle("Untitled")
    }
    if(description === ""){
      setDescription("No description")
    }
    const {lng, lat} = currentMarker._lngLat
    var marker_id = currentMarker._id
    if(insertionMode){
      marker_id = await addMarker({variables:{
        username: username,
        title: title,
        coordinates: [lng, lat],
        description: description
      }})
      marker_id = marker_id.data.addMarker
    }
    if(marker_id !== "" && planId !== ""){
      addSpot({variables:{
        planID: planId,
        markerID: marker_id
      }})
    }
  }
  const { TextArea } = Input;
  return (
    <Card title="Add New Marker">
      <Card type="inner" title="Title">
        <Input placeholder="set your plan title" allowClear
              onChange={(e) => {setTitle(e.target.value)}}
              value={title} ></Input>
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Descriptions"
      >
        <TextArea TextArea rows={4} placeholder="set your plan descriptions" allowClear
                  value={description}
                  onChange={(e) => {setDescription(e.target.value)}}></TextArea> 
      </Card>
      <Card  
        style={{ marginTop: 16 }}
        type="inner"
        title="My Plan List">
        <AddtoPlan plan={plan} list1Value={list1Value} setList1Value={setList1Value}
                showList1={showList1} setshowList1={setshowList1} username={username}
                planId={planId} setPlanId={setPlanId}></AddtoPlan>
      </Card>
      <br></br>
      {insertionMode || !currentMarker ? null : (
      <div>
        <Button size={"small"} onClick={deleteOnclick} style={{position: "absolute", right: "90px", bottom: "10px"}}>Delete</Button>
      </div>)}
      <div>
        <Button size={"small"} onClick={onclick} style={{position: "absolute", right: "25px", bottom: "10px"}}>Save</Button>
      </div>
    </Card>
  )
}

const NEW_ITEM = "NEW_ITEM";
const Option = Select.Option;

const AddtoPlan = ({username, plan, list1Value, setList1Value, showList1, setshowList1, planId, setPlanId}) => {
  const list1Options = plan.map(e=>e.title)
  const [newPlan] = useMutation(NEWPLAN_MUTATION)
  const setDisplayValue = (v) => {
    setList1Value(v);
    const _id = plan.filter(e=>e.title === v)[0]._id
    setPlanId(_id)
  }
  const onChangeList1 = (value) => {
    if (value !== NEW_ITEM) {
      setDisplayValue(value)
    } else {
      setshowList1(true)
    }
  };

  const onConfirm = async (inputValue) => {
    inputValue = inputValue.trim();
    if (list1Options.includes(inputValue)) {
      setshowList1(false)
      setDisplayValue(inputValue)
    } else {
      setshowList1(false)
      const _id = await newPlan({variables:{username:username,title:inputValue}})
      setPlanId(_id.data.newPlan)
      setList1Value(inputValue)
    }
  };

  const list1SelectOptions = list1Options.map(o => (
    <Option key={o}>{o}</Option>
  ));

    return (
      <div>
        <Select
          value={list1Value}
          style={{ width: 100 }}
          onChange={onChangeList1}
        >
          {list1SelectOptions}
          <Option value={NEW_ITEM}>+ New Plan</Option>
        </Select>

        <SweetAlert
          show={showList1}
          title="Add New Plan"
          text="Enter new Plan Name"
          showCancelButton
          type="input"
          inputPlaceholder="Enter Plan Name"
          animation="slide-from-top"
          validationMsg="Please enter a name!"
          onConfirm={onConfirm}
          onCancel={() => {
            setshowList1(false);
          }}
          onEscapeKey={() => {setshowList1(false)}}
          onOutsideClick={() => {setshowList1(false)}}
        />
      </div>
    );
  }

export default AddPlace
