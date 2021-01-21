import React, { useContext, useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom';
import { Tooltip, Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button, Table, Popconfirm,
    Drawer, Col, Row, Select, Space} from 'antd';
// import Highlighter from 'react-highlight-words';
// import { SearchOutlined } from '@ant-design/icons';    
import { ExportOutlined, LockOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined, PlusOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'
import './TourPlan.css'
import usePlan from '../components/usePlan'
import {
//     // for query
//     PLAN_QUERY,
    USERNAME_QUERY,
    USERPLAN_QUERY,
//     // for mutation
//     NEW_PLAN_MUTATION,
//     RENAME_PLAN_MUTATION,
    DELETE_PLAN_MUTATION,
//     NEW_SPOT_MUTATION,
    DELETE_SPOT_MUTATION,
    UPDATE_SPOT_STARTTIME_MUTATION,
    UPDATE_SPOT_ENDTIME_MUTATION,
//     // for subscription
  } from '../graphql'
import background from '../img/place-of-destination.png';
import bucketList from '../img/bucket_list.jpg';
import pointLeft from '../img/point_left.png';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function TourPlan(props){
    // const [username, setUsername] = useState("")
    // const {data:usernameData} = useQuery(USERNAME_QUERY, {variables:{_id:props.match.params.userId}})
    // const {data:usernameData} = useQuery(USERNAME_QUERY, {variables:{_id:props.match.params.userId}})
    const {plan:planState, error, username} = usePlan(props.match.params.userId)

    const [deletePlan] = useMutation(DELETE_PLAN_MUTATION)
    const [deleteSpot] = useMutation(DELETE_SPOT_MUTATION)
    const [updateSpotStartTime] = useMutation(UPDATE_SPOT_STARTTIME_MUTATION)
    const [updateSpotEndTime] = useMutation(UPDATE_SPOT_ENDTIME_MUTATION)

    // const username = usernameData? usernameData.Username : null
    // console.log(planState)
    // console.log(usrename)
    const [showUsermMenu, setShowUsermMenu] = useState(false)
    const [re, setre] = useState(true)
    const [currentPlan, setCurrentPlan] = useState(0)
    const [currentSpot, setCurrentSpot] = useState(0)
    const [initialPlan, setInitialPlan] = useState(true)
    const [newTime, setTime] = useState(false)
    const [newStartTime, setnewStartTime] = useState("")
    const [newEndTime, setnewEndTime] = useState("")

    const history = useHistory();
    const backToMap = () => {
         history.push(`/${props.match.params.userId}`)
    }
    const logout = () => {
         history.push("/")
    }
    
    const handleStartChange = (ev) => {
        if (!ev.target['validity'].valid) return;
        const dt = ev.target['value'] + ':00Z';
        setnewStartTime(dt);
        // console.log(dt)
    }
    const handleEndChange = (ev) => {
        if (!ev.target['validity'].valid) return;
        const dt = ev.target['value'] + ':00Z';
        setnewEndTime(dt);
        // console.log(dt)
      }
    return (
        <React.Fragment>
            <Layout>
            <Header className="header" style={{color: "white", fontSize: "20px", margin: "0px"}}>Tour Plan
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item icon={<UserOutlined />} key="4" style={{position:'absolute', width: '150px',textAlign: 'center', right: '0%'}} onClick={() => {setShowUsermMenu(!showUsermMenu)}}>
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
                        <Menu.Item onClick={() => {
                            setCurrentPlan(i)
                            setInitialPlan(false)
                        }} style={{display: "flex", alignItems: "center"}}>
                            {title}
                            <Button 
                            className="deletePlan"
                            type="dashed"
                            size="small"
                            style={{position: "absolute", right: "10px", fontSize: "5px"}}
                            onClick={() => {
                                deletePlan({variables:{
                                    _id: planState[i]._id
                                  }})
                                setre(!re)
                                // console.log(planState)
                            }}
                            >x</Button>
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
                {(!planState || planState.length === 0)?(<Breadcrumb.Item></Breadcrumb.Item>)
                :(<Breadcrumb.Item>{planState[currentPlan].title}</Breadcrumb.Item>)}   
                </Breadcrumb>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                    {(initialPlan && !(!planState || planState.length === 0))?(
                        <React.Fragment>
                            <h3 style={{margin: "0px", position: "relative", left: "0px"}}>Choose a Plan in the Left</h3> 
                            <br></br>
                            <br></br>
                            <img style={{width: "100px"}} src={pointLeft} alt="pointLeft"/>
                        </React.Fragment>
                        ):
                        (
                    <React.Fragment>
                    <div className="table-title">
                        {(!planState || planState.length === 0)?(<h3></h3>):(<h3 style={{margin: "0px", position: "relative", left: "0px"}}> {planState[currentPlan].title} </h3>)}
                    </div>
                    {((!planState || planState.length === 0)?(
                        <div className="table-title" style={{textAlign: "center"}}> 
                            <h2 style={{fontFamily: "fantasy"}}> No Plan Right Now </h2> 
                            <br></br>
                            <img src={bucketList} alt="Bucket List" style={{width: "500px"}}/>
                        </div>):
                        (<React.Fragment>
                            {(planState[currentPlan].spots.length !== 0)?(
                                <table className="table-fill">
                                <thead>
                                    <tr>
                                        <th className='spot-title' >Title</th>
                                        <th className='spot-description' >Description</th>
                                        <th >Time</th>
                                        <th className='spot-button'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {planState[currentPlan].spots.map((e, i) => (
                                        <tr key={i}>
                                            <td className='spot-title' > {e.location.properties.title} </td>
                                            <td className='spot-description' > {e.location.properties.description} </td>
                                            <td className='spot-time' >
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
                                                            <Button onClick={() => {
                                                                updateSpotStartTime({variables:{
                                                                    _id: planState[currentPlan].spots[currentSpot]._id,
                                                                    time: new Date(newStartTime).toString()
                                                                }})
                                                                updateSpotEndTime({variables:{
                                                                    _id: planState[currentPlan].spots[currentSpot]._id,
                                                                    time: new Date(newEndTime).toString()
                                                                }})
                                                                setTime(false)
                                                                // setre(!re)
                                                                console.log(new Date(newStartTime).toString(), new Date(newEndTime).toString())
                                                            }}
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
                                                    // var temp = planState
                                                    // temp[currentPlan].spots.splice(i, 1)
                                                    // setPlan(temp)
                                                    setre(!re)
                                                    deleteSpot({variables:{
                                                        _id: planState[currentPlan].spots[currentSpot]._id
                                                    }})                
                                                }} style={{width:"100px", textAlign: "center", fontSize: "10px"}}> Delete Spot</Button> 
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>):(
                                <div className="table-title" style={{textAlign: "center"}}> 
                                    <h2 style={{fontFamily: "fantasy"}}> No Spot Right Now </h2> 
                                    <img src={background} alt="Background"/>
                                </div>
                                )}
                        </React.Fragment>))} 
                        </React.Fragment>              
                    )
                    }
                
                {showUsermMenu?( //show menu if click account button
                <div style={{position: "absolute", width: '150px', textAlign: 'center',top: "65px", right: '0%', hidden: 'true'}} zindex={-1}>
                    <Menu theme="blue" mode="vertical">
                    <Menu.Item 
                        icon ={<EnvironmentOutlined/>}
                        key="1" style={{margin: '0px', textAlign: 'left', position: "relative", left: "23px"}} onClick={backToMap}>
                        Tour Map
                    </Menu.Item>
                    <Menu.Item 
                        icon ={<ExportOutlined/>}
                        key="2" style={{margin: '0px', textAlign: 'left', position: "relative", left: "23px"}} onClick={logout}>
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