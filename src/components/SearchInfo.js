import React, { useEffect, useRef, useState } from "react";
import 'antd/dist/antd.css'
import { Input, Layout, Menu, Breadcrumb, Button, Card} from 'antd';
import { TagOutlined, CheckOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input

const SearchInfo = () => {
  const onSearch = value => console.log(value);
  return (
    <Search placeholder="input search text" onSearch={onSearch} enterButton size="default"
      style={{position: "relative", bottom: "0%"}}/>
  )
}

export default SearchInfo