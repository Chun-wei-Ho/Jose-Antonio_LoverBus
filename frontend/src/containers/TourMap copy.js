import React, { useState } from "react"
import MapBox from "../components/Mapbox_TW"
import AddPlace from "../components/addPlace"
import SearchInfo from "../components/SearchInfo"
import Background from '../img/background.jpg';
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button } from 'antd';
import { LockOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined} from '@ant-design/icons';
import "./TourMap.css"
import 'antd/dist/antd.css'

// import {
//     // for query
//     MARKER_QUERY,
//     PLAN_QUERY,
//     SIGNIN_QUERY,
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
//     SIGNUP_MUTATION
//     // for subscription
//   } from '../graphql'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const TourMap = () => {
    const [username, setUsername] = useState("")
    const [usernamedecided, setUsernamedecided] = useState(false)
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setUsername(values.username)
        setUsernamedecided(true)
      };

    // const { subscribeToMore, ...result } = useQuery(
    //     MARKER_QUERY,
    //     { variables: { username: username } }
    //   )

    return (
    <React.Fragment>
        {usernamedecided? ( // 決定是否有輸入 username
        <React.Fragment>
            <Layout>
            <Header className="header">
                <div className="logo" />
                {/* <Input></Input> */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" style={{position: "relative", bottom: "100px"}}>
                        <SearchInfo></SearchInfo>
                    </Menu.Item>
                    <Menu.Item key="2" style={{left: '0px'}}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="3" style={{left: '0px'}}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="4" style={{position:'absolute', left: '93%'}}>
                        {username}
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
            <Sider height={500} width={200} className="site-layout-background">
                <AddPlace></AddPlace>
                {/* <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0}}
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
                </Menu> */}
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
                <Button className="FooterButton">Finish</Button>
                <Button className="FooterButton">Wish</Button>
                <Button className="FooterButton">All</Button>
            </Footer>
            </Layout>
        </React.Fragment>
            
        ) : (
            <div style={{position: "absolute", transform: "translate(-50%, -50%)", top: "50%", left: "50%"}}>
                <div style={{width: "100%", height: "100%"}}>
                    <h3 style={{textAlign: "center"}}>Welcome to Jose-Antonio_LoverBus !</h3>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish} // summit user info
                    >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                    </Form>
                    </div>
                </div>)}
    </React.Fragment>
    )
}

export default TourMap;