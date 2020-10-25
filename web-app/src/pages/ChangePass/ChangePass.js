import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Typography, Alert } from 'antd';
import { AppContext } from '../../context/AppContext';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const ChangePass = () => {
    const { loginState, warnState, msgState, typeAlertState, titleAlertState, userState } = useContext(AppContext);

    const [user, setUser] = userState;
    const [login, setLogin] = loginState;
    const [warn, setWarn] = warnState;
    const [msg, setMsg] = msgState;
    const [typeAlert, setTypeAlert] = typeAlertState;
    const [titleAlert, setTitleAlert] = titleAlertState;
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const onFinish = (values) => {
        if (newPass !== confirmPass) {
            setWarn('block');
            setMsg(`New Password and Confirm Password doesn't match!`);
            setTypeAlert('error');
            setTitleAlert('Error');
        } else {
            axios.post('https://backendexample.sanbersy.com/api/change-password', {
                current_password: values.current_password,
                new_password: values.new_password,
                new_confirm_password: values.new_confirm_password
            },
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            ).then((response) => {
                setWarn('block');
                setMsg('Your password has been changed!');
                setTypeAlert('success');
                setTitleAlert('Success');
            }).catch((err) => {
                setWarn('block');
                setMsg(`Something Wrong! ${err}`);
                setTypeAlert('error');
                setTitleAlert('Error');
            })
        }

    }

    const onFinishFailed = (error) => {
        setWarn('block');
        setMsg(`Something Wrong! ${error}`);
        setTypeAlert('error');
        setTitleAlert('Error');
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'new_password':
                setNewPass(e.target.value);
                break;
            case 'new_confirm_password':
                setConfirmPass(e.target.value);
                break;
        }
    }

    useEffect(() => {
        setWarn('none');
    }, []);

    return (
        <Row>
            <Col span={8}></Col>
            <Col span={8}>
                <Title level={2} style={{ textAlign: 'center' }}>Change Password</Title>
                <Form
                    // {...layout}
                    name='change-password'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onChange={handleChange}
                >
                    <Form.Item
                        name='current_password'
                        rules={[{ required: true, message: 'Please input your Current Password' }]}
                    >
                        <Input.Password name='current_password' placeholder='Current Password' />
                    </Form.Item>
                    <Form.Item
                        name='new_password'
                        rules={[{ required: true, message: 'Please input your New Password' },]}
                    >
                        <Input.Password name='new_password' placeholder='New Password' />
                    </Form.Item>
                    <Form.Item
                        name='new_confirm_password'
                        rules={[
                            { required: true, message: 'Please input your Confirm Password' },
                            // { min: 6, message: 'Password min. 6 character' }
                        ]}
                    >
                        <Input.Password name='new_confirm_password' placeholder='Confirm Password' />
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                            Submit
                        </Button>
                        &nbsp;
                        <Button type='danger' style={{ width: '100%' }}>
                            <Link to='/movies-table'>Cancel</Link>
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

export default ChangePass;