import React, { useContext, useState, useEffect, useRef } from 'react';
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button, Table, Popconfirm} from 'antd';
import { LockOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined, PlusOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'
import './TourPlan.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

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

export default function TourPlan(args){
    // const [username, setUsername] = useState("")
    const username = 'Jose Antonio'
    const [showUsermMenu, setShowUsermMenu] = useState(false)
    const [re, setre] = useState(true)

    const [planState, setPlan] = useState(plan)
    return (
        <React.Fragment>
            <Layout>
            <Header className="header" style={{margin: "0px"}}>
                <div className="logo" />
            </Header>
            <Layout className='middle'>
            <Sider height={500} width={200} className="site-layout-background">
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0}}
                >
                <SubMenu key="sub1" icon={<EnvironmentOutlined />} title="My Plans">
                    {
                      planState.spots.map(({ location }, i) => (
                        <Menu.Item key={i}>
                            {location.properties.title}
                        </Menu.Item>
                      ))
                    }
                </SubMenu>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Plan List</Breadcrumb.Item>
                <Breadcrumb.Item>{planState.title}</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                    <div className="table-title"> <h3> {plan.title} </h3> </div>
                    <table className="table-fill">
                        <thead>
                            <tr>
                                <th className='spot-title'>Title</th>
                                <th className='spot-description'>Description</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {planState.spots.map((e, i) => (
                                <tr key={i}>
                                    <td className='spot-title' style={{}}> {e.location.properties.title} </td>
                                    <td className='spot-description'> {e.location.properties.description} </td>
                                    <td className='spot-time'>
                                       {new Date(e.startTime).toLocaleString()}
                                       <p className="timeto">to</p>
                                        <p>{new Date(e.endTime).toLocaleString()}</p> 
                                    </td>
                                    <td className='spot-button'>
                                        <Button onClick={()=>{}} style={{width:"120px", textAlign: "center"}}> Edit Time</Button>
                                        <Button onClick={()=>{
                                            console.log(i)
                                            var temp = planState
                                            temp.spots.splice(i, 1)
                                            setPlan(temp)
                                            setre(!re)
                                        }} style={{width:"120px", textAlign: "center"}}> Delete Spot</Button> 
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