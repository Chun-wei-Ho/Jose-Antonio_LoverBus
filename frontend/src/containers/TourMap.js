import React from "react"
import TW from "../components/TW"
// import MyComponent from "../components/GoogleMap"
import "./TourMap.css"
import 'antd/dist/antd.css'
import MapBox from "../components/Mapbox_TW"
import { Button} from 'react-bootstrap';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, PictureOutlined, EnvironmentOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const TourMap = () => {
    return (
    <React.Fragment>
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
                <SubMenu key="sub1" icon={<EnvironmentOutlined />} title="地點">
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<PictureOutlined />} title="相片">
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<UserOutlined />} title="揪團成員">
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    
                }}
                >
                <MapBox></MapBox>
                </Content>
            </Layout>
            </Layout>
            <Footer className="Footer">
                <Button className="FooterButton">去過</Button>
                <Button className="FooterButton">想去</Button>
                <Button className="FooterButton">全部</Button>
            </Footer>
        </Layout>
    </React.Fragment>
    )
}

export default TourMap;
