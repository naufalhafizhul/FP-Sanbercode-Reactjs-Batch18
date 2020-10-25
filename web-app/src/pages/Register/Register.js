import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Typography, Alert } from 'antd';
import { AppContext } from '../../context/AppContext';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Register = () => {
    const { loginState, warnState, msgState, typeAlertState, titleAlertState } = useContext(AppContext);

    const [login, setLogin] = loginState;
    const [warn, setWarn] = warnState;
    const [msg, setMsg] = msgState;
    const [typeAlert, setTypeAlert] = typeAlertState;
    const [titleAlert, setTitleAlert] = titleAlertState;

    const onFinish = (values) => {
        axios.post('https://backendexample.sanbersy.com/api/register', {
            name: values.name,
            email: values.email,
            password: values.password
        }).then((response) => {

            setWarn('block');
            setMsg('Your account has been created! Please go to Log In page to Log In with Your E-mail and Password');
            setTypeAlert('success');
            setTitleAlert('Success');
        }).catch((err) => {
            setWarn('block');
            setMsg(`Something Wrong! ${err}`);
            setTypeAlert('error');
            setTitleAlert('Error');
        })
    }

    const onFinishFailed = (error) => {
        setWarn('block');
        setMsg(`Something Wrong! ${error}`);
        setTypeAlert('error');
        setTitleAlert('Error');
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
                    <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
                    <Form
                        // {...layout}
                        name='register'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name='name'
                            rules={[{ required: true, message: 'Please input your Name' }]}
                        >
                            <Input placeholder='Name' />
                        </Form.Item>
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
                                { min: 6, message: 'Password min. 6 character' }
                            ]}
                        >
                            <Input.Password placeholder='Password' />
                        </Form.Item>
                        <p style={{ textAlign: 'center' }}>Already have an account? <Link to='/'>Log In</Link></p>
                        <Form.Item >
                            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                                Submit
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

export default Register;