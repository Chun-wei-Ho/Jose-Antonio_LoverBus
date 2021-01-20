import React, { useEffect, useRef, useState } from "react";
import 'antd/dist/antd.css'
import { Input, Layout, Menu, Breadcrumb, Button, Card } from 'antd';
import { TagOutlined, CheckOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const AddPlace = ({currentMarker}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const onclick = () => {
    if(title === ""){
      alert("Please input a title")
    }
    setTitle("")
    setDescription("")
  }
  // const [map, setMap] = useState(null);
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
    </Card>
  )
}

export default AddPlace