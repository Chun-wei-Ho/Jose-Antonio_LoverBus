import React, { useState, useEffect } from "react"
import {useHistory} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks'
import MapBox from "../components/Mapbox_TW"
import AddPlace from "../components/AddPlace"
import SearchInfo from "../components/SearchInfo"
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button, 
    Drawer, Col, Row, Select, DatePicker } from 'antd';
import { ExportOutlined, HeartOutlined, LockOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined, PlusOutlined} from '@ant-design/icons';
import usePlan from '../components/usePlan'

import {
//     // for query
//     MARKER_QUERY,
//     PLAN_QUERY,
    USERPLAN_QUERY,
    // SIGNIN_QUERY,
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
    // SIGNUP_MUTATION
//     // for subscription
USERNAME_QUERY,
  } from '../graphql' 

import "./TourMap.css"
import 'antd/dist/antd.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const TourMap = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // const {data:usernameData} = useQuery(USERNAME_QUERY, {variables:{_id:props.match.params.userId}})

    const {plan, error, username} = usePlan(props.match.params.userId)

    // const username = usernameData? usernameData.Username : ""
    const [currentMarker, setCurrentMarker] = useState(null)
    const [insertionMode, _setInsertionMode] = useState(false)
    const setInsertionMode = (mode) => {_setInsertionMode(mode)}
    const [showUsermMenu, setShowUsermMenu] = useState(false)
    const history = useHistory();

    const markerCallback = (marker) => { setCurrentMarker(marker) }
    const toTourPlan = () => {
        history.push(`${history.location.pathname}/TourPlan`)
    }
    const Logout = () => {
        history.push("/")
    }
    return (
        <React.Fragment>
            <Layout style={{minWidth: "1000px"}}>
            <Header className="header" style={{color: "white", fontSize: "20px"}}>Tour Map
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item 
                        // className="mh7"
                        icon={<UserOutlined />} key="4" style={{position:'absolute', width: '150px',textAlign: 'center', right: '0%'}} onClick={() => {setShowUsermMenu(!showUsermMenu)}}>
                        {username}
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
            <Sider height={500} width={200} className="site-layout-background">
                <AddPlace username={username} currentMarker={currentMarker} plan={plan} insertionMode={insertionMode}
                        title={title} setTitle={setTitle} description={description}
                        setDescription={setDescription} setCurrentMarker={setCurrentMarker}></AddPlace>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
                >
                <MapBox username={username} markerCallback={markerCallback} insertionMode={insertionMode}
                    title={title} setTitle={setTitle} description={description} setInsertionMode={setInsertionMode}
                        setDescription={setDescription}></MapBox>
                {showUsermMenu?( //show menu if click account button
                <div style={{position: "absolute", width: '150px', textAlign: 'center',top: "65px", right: '0%', hidden: 'true'}} zindex={-1}>
                    <Menu theme="blue" mode="vertical">
                    <Menu.Item 
                        icon ={<EnvironmentOutlined/>}
                        key="1" style={{margin: '0px', textAlign: 'left', position: "relative", left: "23px"}} onClick={toTourPlan}>
                        {/* <Link to="/">Tour Map</Link> */}
                        Tour Plan
                    </Menu.Item>
                    <Menu.Item 
                        icon ={<ExportOutlined/>}
                        key="2" style={{left: '0px', textAlign: 'left', position: "relative", left: "23px"}} onClick={
                        Logout
                        }>
                        Logout
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

export default TourMap;




// class App extends React.Component {
//   state = { visible: false };

//   showDrawer = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   onClose = () => {
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     return (
//       <div className="site-drawer-render-in-current-wrapper">
//         Render in this
//         <div style={{ marginTop: 16 }}>
//           <Button type="primary" onClick={this.showDrawer}>
//             Open
//           </Button>
//         </div>
//         <Drawer
//           title="Basic Drawer"
//           placement="right"
//           closable={false}
//           onClose={this.onClose}
//           visible={this.state.visible}
//           getContainer={false}
//           style={{ position: 'absolute' }}
//         >
//           <p>Some contents...</p>
//         </Drawer>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, mountNode);