import React, { useState, useEffect, useCallback } from "react"
import {useHistory} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks'
import MapBox from "../components/Mapbox_TW"
import AddPlace from "../components/AddPlace"
import SearchInfo from "../components/SearchInfo"
import { Form, Checkbox, Input, Layout, Menu, Breadcrumb, Button, 
    Drawer, Col, Row, Select, DatePicker } from 'antd';
import { LockOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined, PlusOutlined} from '@ant-design/icons';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom"; 
import TourPlan from "./TourPlan"

import "./TourMap.css"
import 'antd/dist/antd.css'
import './Login.css'

import {
//     // for query
//     MARKER_QUERY,
//     PLAN_QUERY,
    SIGNIN_QUERY,
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
    SIGNUP_MUTATION
//     // for subscription
  } from '../graphql'
// import { Switch } from "@material-ui/core"


export default function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(false)
    const {data:signIndata, error:signInError} = useQuery(SIGNIN_QUERY, {variables: {username, password}})
    const [signUp]= useMutation(SIGNUP_MUTATION)
    const[regisUsername, setRegisUsername] = useState("")
    const[regisPassword, setRegisPassword] = useState("")
    const[regisRetype, setRegisRetype] = useState("")
    const [showUsermMenu, setShowUsermMenu] = useState(false)

    const history = useHistory();
    // const handleRout = useCallback(() => history.push(`/${signIndata}`), [history]);

    const onFinish = (values) => {
        setUsername(values.username)
        setPassword(values.password)
    };

    useEffect(() => {
        if(signIndata) history.push(`/${signIndata.signIn}`)
    }, [signIndata])

    useEffect(() =>{
        if(!signInError || !username) return
        alert(signInError.message)
    }, [signInError])
    const enter_registerAccount = (event)=>{
        if(event.keyCode===13){
            registerAccount()
        }
    }
    const registerAccount = async () => {
        if(regisUsername === ""){
            alert("Please enter username")
            return
        }
        if(regisPassword === ""){
            alert("Please enter password")
            return
        }
        if(regisRetype === ""){
            alert("Please retype password")
            return
        }
        if(regisPassword !== regisRetype){
            alert("Password mismatch")
            return
        }
        try{
            await signUp({variables: {username: regisUsername, password: regisPassword}})
            alert(`Welcome to join us, ${regisUsername}!`)
            setRegister(false)
        }
        catch(err){
            alert(err)
            return
        }
    }
    return (
    <React.Fragment>
        <div className='login-background'>
        <div className='login-root'>
            <div className='login-section'>
                <h5 className='login-title'>Welcome to Jose Antonio LoverBus !</h5>
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
                    Or  
                    <React.Fragment>
                        <a className='register-link' onClick={() => setRegister(true)}>
                            Register Now
                        </a>
                        <Drawer
                            title="Create a new account"
                            width={360}
                            onClose={() => setRegister(false)}
                            visible={register}
                            bodyStyle={{ paddingBottom: 80 }}
                            footer={
                                <div
                                    style={{
                                        textAlign: 'right',
                                }}
                            >
                                <Button onClick={() => setRegister(false)} style={{ marginRight: 8 }}>
                                    Cancel
                                </Button>
                                <Button onClick={registerAccount} type="primary">
                                    Submit
                                </Button>
                            </div>
                        }
                        >
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col>
                                        <Form.Item
                                            name="username"
                                            label="Username"
                                            rules={[{ required: true, message: 'Please enter username' }]}
                                            >
                                            <Input placeholder="Please enter username"
                                                onChange={e=>setRegisUsername(e.target.value)}
                                                onKeyUp={enter_registerAccount}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col>
                                        <Form.Item
                                            name="password"
                                            label="Password"
                                            rules={[{ required: true, message: 'Please enter password' }]}
                                            >
                                            <Input placeholder="Please enter password" type="password"
                                                onChange={e=>setRegisPassword(e.target.value)}
                                                onKeyUp={enter_registerAccount}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col>
                                        <Form.Item
                                            name="Retype password"
                                            label="Retype Password"
                                            rules={[{ required: true, message: 'Please retype password' }]}
                                            >
                                            <Input placeholder="Please retype your password" type="password"
                                                onChange={e=>setRegisRetype(e.target.value)}
                                                onKeyUp={enter_registerAccount}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Drawer>
                    </React.Fragment>
                </Form.Item>
                </Form>
                </div>
            </div>
            </div>
    </React.Fragment>
    )

}