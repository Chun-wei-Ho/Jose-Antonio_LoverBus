import React, { useState } from "react"
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button } from 'antd';
import 'antd/dist/antd.css'
import './TourPlan.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function PlanList(args){
    // const [username, setUsername] = useState("")
    const username = 'Jose Antonio'
    const [showUsermMenu, setShowUsermMenu] = useState(false)

    const userPlan = [
        {title: "Baby Shark do do do",
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
        _id: ""},

        {title: "Do you want to build a snowman",
        spots: [
            {
                _id: "",
                startTime: "Wed Feb 13 2020 10:52:00 GMT+0800",
                endTime: "Wed Feb 13 2020 22:52:00 GMT+0800",
                location: {
                        properties: {title: "My Home", description: "A good place to lie lie."},
                        geometry: {coordinates: [2,3]},
                        _id: ""
                    }
            },
            {
                _id: "",
                startTime: "Thu Feb 14 2020 10:52:00 GMT+0800",
                endTime: "Thu Feb 14 2020 22:52:00 GMT+0800",
                location: {
                        properties: {title: "Pillow Mountain", description: "Everyday we climb."},
                        geometry: {coordinates: [2,3]},
                        _id: ""
                    }
            }
            ],
        _id: ""}
        ]
    return (
        <React.Fragment>
            <Layout>
            <Header className="header" style={{margin: "0px"}}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" style={{position: "absolute", left: '0px', height: '64px'}}>
                        <p>Jose Antonio LoverBus</p>
                    </Menu.Item>
                    <Menu.Item key="2" style={{position: "absolute", left: '198.4px'}}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="3" style={{position: "absolute", left: '277.68px'}}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="4" style={{position:'absolute', width: '150px',textAlign: 'center', right: '0%', }} onClick={() => {setShowUsermMenu(!showUsermMenu)}}>  {/*new add*/}
                        {username}
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout className='middle'>
            <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Plan List</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                    <div className="table-title"> <h3> {username}'s Plan List </h3> </div>
                    <table className="table-fill">
                        <thead>
                            <tr>
                                <th className='spot-title'>Plan Name</th>
                                <th className='spot-description'>Spots in the Plan</th>
                                <th>Total Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {userPlan.map(e => (
                                <tr>
                                    <td className='plan-title' style={{}}> {e.title} </td>
                                    <td className='plan-spots'>
                                        {e.spots.map(spot=>(<p>{spot.location.properties.title}</p>))}
                                    </td>
                                    <td className='spot-time'>
                                       {new Date(e.spots[0].startTime).toLocaleString()}
                                       <p className="timeto">to</p>
                                        <p>{new Date(e.spots[e.spots.length].endTime).toLocaleString()}</p> 
                                    </td>
                                    <td className='spot-button'>
                                        <button onClick={()=>{}}> Delete Plan</button> 
                                    </td>
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
        </React.Fragment>
    )
}