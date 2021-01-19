import React, { useState } from "react"
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button } from 'antd';
import { LockOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'


const { Header, Content, Footer, Sider } = Layout;

const PlanList = () => {  
    plans=[]  
    return (
    <React.Fragment>
        {plans? ( // 決定是否已有任何的plan
        <React.Fragment>
            <Layout>
            <Header className="header" style={{margin: "0px"}}>
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
                    <Menu.Item key="4" style={{position:'absolute', width: '150px',textAlign: 'center', right: '0%', }} onClick={() => {setShowUsermMenu(!showUsermMenu)}}>  {/*new add*/}
                        {username}
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
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
                {/*new add*/ }
                {showUsermMenu?( //show menu if click account button
                <div style={{position: "absolute", width: '150px', textAlign: 'center',top: "65px", right: '0%', hidden: 'true'}} zindex={-1}>
                    <Menu theme="blue" mode="vertical">
                    <Menu.Item key="1" style={{margin: '0px'}}>
                        Plan List
                    </Menu.Item>
                    <Menu.Item key="2" style={{left: '0px'}}>
                        logout
                    </Menu.Item>
                    </Menu>
                </div>):null
                }
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

export default PlanList;