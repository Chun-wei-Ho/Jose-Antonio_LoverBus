import React, { useState } from "react"
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button } from 'antd';
import { LockOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'
import SearchInfo from "../components/SearchInfo"


const { Header, Content, Footer, Sider } = Layout;

const PlanList = () => {  
    var plans=[]
    const [username, setUsername] = useState("")
    const [showUsermMenu, setShowUsermMenu] = useState(false)  
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
            <h1>No Plan</h1>
        )}
    </React.Fragment>
    )
}

export default PlanList;