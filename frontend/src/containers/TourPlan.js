import React, { useContext, useState, useEffect, useRef } from 'react';
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button, Table, Popconfirm,
    Drawer, Col, Row, Select} from 'antd';
import { LockOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined, PlusOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'
import './TourPlan.css'
import SearchInfo from "../components/SearchInfo"

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const plan = [{
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
    },
    {
        title: "lol",
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
        }]

export default function TourPlan(args){
    // const [username, setUsername] = useState("")
    const username = 'Jose Antonio'
    const [showUsermMenu, setShowUsermMenu] = useState(false)
    const [re, setre] = useState(true)
    const [currentPlan, setCurrentPlan] =  useState(0)
    const [planState, setPlan] = useState(plan)
    const [newTime, setTime] = useState(false)
    const [currentSpot, setCurrentSpot] = useState(0)
    const [newStartTime, setnewStartTime] = useState("")
    const [newEndTime, setnewEndTime] = useState("")
    
    const handleStartChange = (ev) => {
        if (!ev.target['validity'].valid) return;
        const dt = ev.target['value'] + ':00Z';
        setnewStartTime(dt);
        console.log(dt)
    }
    const handleEndChange = (ev) => {
        if (!ev.target['validity'].valid) return;
        const dt = ev.target['value'] + ':00Z';
        setnewEndTime(dt);
        console.log(dt)
      }

    const[regisUsername, setRegisUsername] = useState("")

    return (
        <React.Fragment>
            <Layout>
            <Header className="header" style={{margin: "0px"}}>
                <div className="logo" />
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
                    <Menu.Item key="4" style={{position:'absolute', width: '150px',textAlign: 'center', right: '0%'}} onClick={() => {setShowUsermMenu(!showUsermMenu)}}>
                        {username}
                    </Menu.Item>
                </Menu>
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
                      planState.map(({ title }, i) => (
                        <Menu.Item key={i} onClick={() => {setCurrentPlan(i)
                        }}>
                            {title}
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
                <Breadcrumb.Item>{planState[currentPlan].title}</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                    <div className="table-title"> <h3> {planState[currentPlan].title} </h3> </div>
                    {(planState[currentPlan].spots.length !== 0)?
                    (<table className="table-fill">
                        <thead>
                            <tr>
                                <th className='spot-title'>Title</th>
                                <th className='spot-description'>Description</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {planState[currentPlan].spots.map((e, i) => (
                                <tr key={i}>
                                    <td className='spot-title' style={{}}> {e.location.properties.title} </td>
                                    <td className='spot-description'> {e.location.properties.description} </td>
                                    <td className='spot-time'>
                                       <p>{new Date(e.startTime).toLocaleString()}</p>
                                       <p className="timeto">to</p>
                                        <p>{new Date(e.endTime).toLocaleString()}</p> 
                                    </td>
                                    <td className='spot-button'>
                                        <Button onClick={() => {setTime(true)
                                        setCurrentSpot(i)}} 
                                        style={{width:"100px", textAlign: "center", fontSize: "10px"}}> Edit Time</Button>
                                        <React.Fragment>
                                            <Drawer
                                                title={planState[currentPlan].spots[currentSpot].location.properties.title}
                                                width={360}
                                                onClose={() => {setTime(false)}}
                                                visible={newTime}
                                                bodyStyle={{ paddingBottom: 80 }}
                                                footer={
                                                    <div
                                                        style={{
                                                            textAlign: 'right',
                                                    }}
                                                >
                                                    <Button onClick={() => {setTime(false)}} style={{ marginRight: 8 }}>
                                                        Cancel
                                                    </Button>
                                                    {/* <Button onClick={registerAccount} */}
                                                    <Button onClick={() => {}}
                                                        type="primary">
                                                        Change Time
                                                    </Button>
                                                </div>
                                            }
                                            >
                                                <Form layout="vertical" hideRequiredMark>
                                                    <Row gutter={16}>
                                                        <Col>
                                                            <Form.Item
                                                                name="Start time"
                                                                label="Start time"
                                                                rules={[{ required: true, message: 'Please enter new start time' }]}
                                                                >
                                                                <input 
                                                                    type="datetime-local"
                                                                    name="start time"
                                                                    value={(newStartTime || '').toString().substring(0, 16)}
                                                                    onChange={handleStartChange} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={16}>
                                                        <Col>
                                                            <Form.Item
                                                                name="End time"
                                                                label="End time"
                                                                rules={[{ required: true, message: 'Please enter new end time' }]}
                                                                >
                                                                <input 
                                                                    type="datetime-local"
                                                                    name="end time"
                                                                    value={(newEndTime || '').toString().substring(0, 16)}
                                                                    onChange={handleEndChange} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Drawer>
                                        </React.Fragment>
                                        <Button onClick={()=>{
                                            var temp = planState
                                            temp[currentPlan].spots.splice(i, 1)
                                            setPlan(temp)
                                            setre(!re)
                                        }} style={{width:"100px", textAlign: "center", fontSize: "10px"}}> Delete Spot</Button> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>):(
                        <div className="table-title"> <div> No Spot Right Now </div> </div>)
                    }
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
            </Layout>
        </React.Fragment>
    )
}