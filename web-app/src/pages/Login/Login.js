import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Typography, Alert } from 'antd';
import { AppContext } from '../../context/AppContext';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Loading3QuartersOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login = () => {
    const { loginState, userState, warnState, msgState, typeAlertState, titleAlertState, submittedState } = useContext(AppContext);

    const isLogin = localStorage.getItem('isLogin');

    const [login, setLogin] = loginState;
    const [warn, setWarn] = warnState;
    const [msg, setMsg] = msgState;
    const [typeAlert, setTypeAlert] = typeAlertState
    const [user, setUser] = userState;
    const [titleAlert, setTitleAlert] = titleAlertState;
    const [submitted, setSubmitted] = submittedState;

    const onFinish = (values) => {
        setSubmitted(true);
        console.log('submit ', submitted);
        axios.post('https://backendexample.sanbersy.com/api/user-login', {
            email: values.email,
            password: values.password
        }).then((response) => {
            console.log(response.data.user);
            let user = response.data.user;
            let token = response.data.token;
            let currentUser = { name: user.name, email: user.email, token };
            setUser(currentUser);
            localStorage.setItem('user', JSON.stringify(currentUser));
            localStorage.setItem('isLogin', 1);
            setSubmitted(false);
            setLogin(1);
        }).catch((err) => {
            setWarn('block');
            setMsg(`Something Wrong! ${err}`);
            setTypeAlert('error');
            setTitleAlert('Error');
            setSubmitted(false);
        })
    }

    const onFinishFailed = (error) => {
        console.log('submit ', submitted);
        setWarn('block');
        setMsg(`Something Wrong! ${error}`);
        setTypeAlert('error');
        setTitleAlert('Error');
        setSubmitted(false);
    }

    useEffect(() => {
        setWarn('none');
    }, []);

    return (
        login === 1 ?
            <Redirect to='/movies' /> :
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                    <Form
                        // {...layout}
                        name='register'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name='email'
                            rules={[
                                { required: true, message: 'Please input your E-mail' },
                                { type: 'email', message: 'Invalid E-mail Format' }
                            ]}
                        >
                            <Input placeholder='E-mail' />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[
                                { required: true, message: 'Please input your Password' },
                            ]}
                        >
                            <Input.Password placeholder='Password' />
                        </Form.Item>
                        <p style={{ textAlign: 'center' }}>Don't have an account? <Link to='/register'>Register</Link></p>
                        <Form.Item >
                            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                                {submitted == true ? <Loading3QuartersOutlined spin /> : 'Login'}
                            </Button>
                        </Form.Item>
                    </Form>
                    <Alert
                        style={{ display: warn }}
                        message={titleAlert}
                        description={msg}
                        type={typeAlert}
                        showIcon
                    />
                </Col>
                <Col span={8}></Col>
            </Row>
    );
}

export default Login;