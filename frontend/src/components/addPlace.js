import React, { useEffect, useRef, useState } from "react";
import 'antd/dist/antd.css'
import { Input, Layout, Menu, Breadcrumb, Button, Card } from 'antd';
import { TagOutlined, CheckOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const addPlace = () => {
  
  // const [map, setMap] = useState(null);
  const { TextArea } = Input;
  return (
    <Card title="Add New Plan">
      <Card type="inner" title="Title">
        <Input placeholder="set your plan title" allowClear ></Input>
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Discriptions"
      >
        <TextArea TextArea rows={4} placeholder="set your plan discriptions" allowClear></TextArea> 
      </Card>
      <br></br>
      <div style={{position: "absolute", right: "25px", bottom: "10px"}}>
        <Button size={"small"}>OK</Button>
      </div>
    </Card>
  )
}

export default addPlace