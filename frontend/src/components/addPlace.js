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
// for subscription
} from '../graphql'

const { Header, Content, Footer, Sider } = Layout;

const AddPlace = ({username, currentMarker, markerContentCallback}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const setCurrentMarkerContent = e => { markerContentCallback(e);} 

  const [addMarker] = useMutation(ADD_MARKER_MUTATION)
  const onclick = () => {
    if(title === ""){
      alert("Please input a title")
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
      <br></br>
      <div style={{position: "absolute", right: "25px", bottom: "10px"}}>
        <Button size={"small"} onClick={onclick}>OK</Button>
      </div>
      <Demo></Demo>
    </Card>
  )
}



const NEW_ITEM = "NEW_ITEM";

const Option = Select.Option;

const list1Options = ["option-1", "option-2", "option-3"];

class Demo extends React.Component {
  state = {
    list1Value: "",

    showList1: false,

    list1Options: list1Options
  };

  onChangeList1 = value => {
    if (value !== NEW_ITEM) {
      this.setState({ list1Value: value });
    } else {
      this.setState({ showList1: true });
    }
  };

  onConfirm = inputValue => {
    inputValue = inputValue.trim();
    if (this.state.list1Options.includes(inputValue)) {
      this.setState({
        showList1: false,
        list1Value: inputValue
      });
    } else {
      this.setState({
        showList1: false,
        list1Options: [inputValue, ...this.state.list1Options],
        list1Value: inputValue
      });
    }
  };

  render() {
    const { list1Value } = this.state;

    const list1SelectOptions = this.state.list1Options.map(o => (
      <Option key={o}>{o}</Option>
    ));

    return (
      <div>
        <h3>List-1</h3>
        <Select
          value={list1Value}
          style={{ width: 420 }}
          onChange={this.onChangeList1}
        >
          {list1SelectOptions}
          <Option value={NEW_ITEM}>+ New Item</Option>
        </Select>

        <SweetAlert
          show={this.state.showList1}
          title="Add New System Name"
          text="Enter new System Name"
          showCancelButton
          type="input"
          inputPlaceholder="Enter System Name"
          animation="slide-from-top"
          validationMsg="Please enter a response!"
          onConfirm={inputValue => {
            inputValue = inputValue.trim();
            if (this.state.list1Options.includes(inputValue)) {
              this.setState({
                showList1: false,
                list1Value: inputValue
              });
            } else {
              this.setState({
                showList1: false,
                list1Options: [inputValue, ...this.state.list1Options],
                list1Value: inputValue
              });
            }
          }}
          onCancel={() => {
            this.setState({ showList1: false });
          }}
          onEscapeKey={() => this.setState({ showList1: false })}
          onOutsideClick={() => this.setState({ showList1: false })}
        />
      </div>
    );
  }
}

export default AddPlace
