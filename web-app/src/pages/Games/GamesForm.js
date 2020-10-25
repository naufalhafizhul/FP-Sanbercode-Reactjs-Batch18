import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Button, Select, Slider, Row, Col, Image, Typography, Alert, Checkbox } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardItem from '../../components/CardItem/CardItem';
import Notification from '../../components/Notification/Notification';
import { AppContext } from '../../context/AppContext';

const { Title } = Typography;
const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const GamesForm = (props) => {
    const { gameState, loadingState, userState, submittedState } = useContext(AppContext);

    const [user, setUser] = userState;
    const [submitted, setSubmitted] = submittedState;
    const [form] = Form.useForm();
    const [idParams, setIdParams] = useState(0);
    const [index, setIndex] = useState(typeof props.match.params.id !== 'undefined' ? 0 : -1);

    useEffect(() => {
        if (typeof props.match.params.id !== 'undefined') {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${props.match.params.id}`)
                .then(res => {
                    let d = res.data;
                    form.setFieldsValue({
                        genre: d.genre,
                        image_url: d.image_url,
                        singlePlayer: d.singlePlayer,
                        multiplayer: d.multiplayer,
                        name: d.name,
                        platform: d.platform,
                        release: d.release
                    });
                })
            setSubmitted(false);
        }
    }, []);

    const onFinish = values => {
        if (index === 0) {
            setSubmitted(true);
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${props.match.params.id}`,
                {
                    genre: values.genre,
                    image_url: values.image_url,
                    singlePlayer: values.singlePlayer,
                    multiplayer: values.multiplayer,
                    name: values.name,
                    platform: values.platform,
                    release: values.release
                },
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            ).then((response) => {
                Notification('success', 'Success!', 'Data has been updated!');
                setSubmitted(false);
            }).catch((err) => {
                console.log(err);
                Notification('error', 'Error!', `Something Wrong! ${err}`);
                setSubmitted(false);
            })
        } else {
            setSubmitted(true);
            axios.post('https://backendexample.sanbersy.com/api/data-game',
                {
                    genre: values.genre,
                    image_url: values.image_url,
                    singlePlayer: values.singlePlayer,
                    multiplayer: values.multiplayer,
                    name: values.name,
                    platform: values.platform,
                    release: values.release
                },
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            ).then((response) => {
                form.resetFields();
                Notification('success', 'Success!', 'Data has been added!');
                setSubmitted(false);
                form.resetFields();
            }).catch((err) => {
                console.log(err);
                Notification('error', 'Error!', `Something Wrong! ${err}`);
                setSubmitted(false);
            })
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        Notification('error', 'Error!', 'Failed to submit data');
    };

    return (
        <Row>
            <Col span={24}>
                <Form
                    form={form}
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                        hasFeedback
                    >
                        <Input name='name' disabled={submitted == true ? true : false} />
                    </Form.Item>

                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[{ required: true, message: 'Please input genre!' }]}
                        hasFeedback
                    >
                        <Input name='genre' rows={4} disabled={submitted == true ? true : false} />
                    </Form.Item>

                    <Form.Item
                        label="Single Player"
                        name="singlePlayer"
                        valuePropName="checked"
                    >
                        <Checkbox>Single Player</Checkbox>
                    </Form.Item>

                    <Form.Item
                        label="Multiplayer"
                        name="multiplayer"
                        valuePropName="checked"
                    >
                        <Checkbox>Multiplayer</Checkbox>
                    </Form.Item>

                    <Form.Item
                        label="Platform"
                        name="platform"
                        rules={[{ required: true, message: 'Please input platform!' }]}
                        hasFeedback
                    >
                        <Input name='platform' disabled={submitted == true ? true : false} />
                    </Form.Item>

                    <Form.Item
                        label="Release"
                        name="release"
                        rules={[{ required: true, message: 'Please input release!' }]}
                        hasFeedback
                    >
                        <Input name='release' disabled={submitted == true ? true : false} />
                    </Form.Item>

                    <Form.Item
                        label="Image URL"
                        name="image_url"
                        rules={[{ required: true, message: 'Please input image url!' }]}
                        hasFeedback
                    >
                        <Input.TextArea name='image_url' rows={4} disabled={submitted == true ? true : false} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            {submitted == true ? <Loading3QuartersOutlined spin /> : 'Submit'}
                        </Button>
                        &nbsp;
                        &nbsp;
                        <Button type="danger" >
                            <Link to='/games-table'>Cancel</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    );
}

export default GamesForm;