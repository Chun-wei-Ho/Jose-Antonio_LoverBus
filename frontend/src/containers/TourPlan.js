import React, { useState } from "react"
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button } from 'antd';
import 'antd/dist/antd.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function TourPlan(args){
    // const [username, setUsername] = useState("")
    const username = 'Jose Antonio'
    const [showUsermMenu, setShowUsermMenu] = useState(false)

    const plan = {
        title: "Baby Shark do do do",
        spots: [
            {
                _id: "",
                startTime: "Wed Feb 19 2020 10:52:00 GMT+0800",
                endTime: "Wed Feb 19 2020 22:52:00 GMT+0800",
                location: {
                        properties: {title: "National Taiwan University", description: "Largest Zoo in Taipei"},
                        geometry: {coordinates: [2,3]},
                        _id: ""
                    }
            },
            {
                _id: "",
                startTime: "Thu Feb 21 2020 10:52:00 GMT+0800",
                endTime: "Thu Feb 21 2020 22:52:00 GMT+0800",
                location: {
                        properties: {title: "National Kaohsiung University", description: "Moon lovers in Kaohsiung"},
                        geometry: {coordinates: [2,3]},
                        _id: ""
                    }
            }
            ],
        _id: ""
        }
    return (
        <React.Fragment>
            <Layout>
            <Header className="header" style={{margin: "0px"}}>
                <div className="logo" />
                {/* <Input></Input> */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" style={{position: "relative", bottom: "100px"}}>
                        <p>Jose Antonio_LoverBus</p>
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
            <Sider height={500} width={200} className="site-layout-background">
                <h1>Plan List</h1>
                <p>plan 1</p>
                <p>plan 2</p>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                    <h1> {plan.title} </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>title</td>
                                <td>description</td>
                                <td>time</td>
                            </tr>
                        </thead>
                        <tbody>
                            {plan.spots.map(e => (
                                <tr>
                                    <td> {e.location.properties.title} </td>
                                    <td> {e.location.properties.description} </td>
                                    <td> {new Date(e.startTime).toLocaleString()}
                                            - {new Date(e.endTime).toLocaleString()} <button onClick={()=>{}}> Edit </button> 
                                            <button onClick={()=>{}}> Delete </button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                {showUsermMenu?( //show menu if click account button
                <div style={{position: "absolute", width: '150px', textAlign: 'center',top: "65px", right: '0%', hidden: 'true'}} zindex={-1}>
                    <Menu theme="blue" mode="vertical">
                    <Menu.Item key="1" style={{margin: '0px'}}>
                        Tour Map
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
        {/* <h1> {plan.title} </h1>
        <table>
            <thead>
                <tr>
                    <td>title</td>
                    <td>description</td>
                    <td>time</td>
                </tr>
            </thead>
            <tbody>
                {plan.spots.map(e => (
                    <tr>
                        <td> {e.location.properties.title} </td>
                        <td> {e.location.properties.description} </td>
                        <td> {new Date(e.startTime).toLocaleString()}
                                - {new Date(e.endTime).toLocaleString()} <button onClick={()=>{}}> Edit </button> 
                                <button onClick={()=>{}}> Delete </button> </td>
                    </tr>
                ))}
            </tbody>
        </table> */}
        </React.Fragment>
    )
}