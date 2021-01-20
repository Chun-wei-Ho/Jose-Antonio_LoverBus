import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks'
import 'antd/dist/antd.css'
import { Input, Layout, Menu, Breadcrumb, Button, Card, Select } from 'antd';
import { TagOutlined, CheckOutlined} from '@ant-design/icons';
import SweetAlert from "react-bootstrap-sweetalert";

import {
// for query
// MARKER_QUERY,
// for mutation
ADD_MARKER_MUTATION,
// DELETE_MARKER_MUTATION,
// UPDATE_MARKER_MUTATION,
NEWPLAN_MUTATION,
// for subscription
} from '../graphql'

const { Header, Content, Footer, Sider } = Layout;

const AddPlace = ({username, currentMarker, markerContentCallback, insertionMode, plan, title, setTitle, description, setDescription}) => {
  const setCurrentMarkerContent = e => { markerContentCallback(e);} 

  const [list1Value, setList1Value] = useState("")
  const [showList1, setshowList1] = useState(false)

  const [addMarker] = useMutation(ADD_MARKER_MUTATION)
  const onclick = () => {
    if(title === ""){
      alert("Please input a title")
    }
    if(!currentMarker) {
      alert("sellect a marker to add")
      return
    }
    const {lng, lat} = currentMarker._lngLat

    addMarker({variables:{
      username: username,
      title: title,
      coordinates: [lng, lat],
      description: description
    }})
    // addMarkContent({})

    setTitle("")
    setDescription("")
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
                showList1={showList1} setshowList1={setshowList1} username={username}></AddtoPlan>
      </Card>
      <br></br>
      <div>
        <Button size={"small"} onClick={onclick} style={{position: "absolute", right: "25px", bottom: "10px"}}>Save</Button>
      </div>
    </Card>
  )
}

const NEW_ITEM = "NEW_ITEM";
const Option = Select.Option;

const AddtoPlan = ({username, plan, list1Value, setList1Value, showList1, setshowList1}) => {
  const list1Options = plan.map(e=>e.title)
  const [newPlan] = useMutation(NEWPLAN_MUTATION)
  const onChangeList1 = (value) => {
    if (value !== NEW_ITEM) {
      setList1Value(value)
    } else {
      setshowList1(true)
    }
  };

  const onConfirm = (inputValue) => {
    inputValue = inputValue.trim();
    if (list1Options.includes(inputValue)) {
      setshowList1(false)
      setList1Value(inputValue)
    } else {
      setshowList1(false)
      newPlan({variables:{username:username,title:inputValue}})
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
          <Option value={NEW_ITEM}>+ New Item</Option>
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
