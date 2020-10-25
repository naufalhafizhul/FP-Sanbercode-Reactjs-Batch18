import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Button, Select, Slider, Row, Col, Image, Typography, Alert } from 'antd';
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

const MoviesForm = (props) => {
    const { movieState, loadingState, userState, submittedState } = useContext(AppContext);

    const [user, setUser] = userState;
    const [submitted, setSubmitted] = submittedState;
    const [form] = Form.useForm();
    const [idParams, setIdParams] = useState(0);
    const [index, setIndex] = useState(typeof props.match.params.id !== 'undefined' ? 0 : -1);

    useEffect(() => {
        if (typeof props.match.params.id !== 'undefined') {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${props.match.params.id}`)
                .then(res => {
                    let d = res.data;
                    form.setFieldsValue({
                        title: d.title,
                        description: d.description,
                        year: d.year,
                        duration: d.duration,
                        genre: d.genre,
                        rating: d.rating,
                        review: d.review,
                        image_url: d.image_url
                    });
                })
            setSubmitted(false);
        }
    }, []);

    const onFinish = values => {
        if (index === 0) {
            setSubmitted(true);
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${props.match.params.id}`,
                {
                    title: values.title,
                    description: values.description,
                    year: values.year,
                    duration: values.duration,
                    genre: values.genre,
                    rating: values.rating,
                    review: values.review,
                    image_url: values.image_url
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
            axios.post('https://backendexample.sanbersy.com/api/data-movie',
                {
                    title: values.title,
                    description: values.description,
                    year: values.year,
                    duration: values.duration,
                    genre: values.genre,
                    rating: values.rating,
                    review: values.review,
                    image_url: values.image_url
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
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input title!' }]}
                        hasFeedback
                    >
                        <Input name='title' disabled={submitted == true ? true : false} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description!' }]}
                        hasFeedback
                    >
                        <Input.TextArea name='description' rows={4} disabled={submitted == true ? true : false} />
                    </Form.Item>

                    <Form.Item
                        label="Year"
                        name="year"
                        rules={[{ required: true, message: 'Please input year!' }]}
                        hasFeedback
                    >
                        <InputNumber
                            min={1980}
                            style={{ width: '100%' }}
                            disabled={submitted == true ? true : false}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Duration"
                        name="duration"
                        rules={[
                            { required: true, message: 'Please input duration!' },
                        ]}
                        hasFeedback
                    >
                        <InputNumber
                            min={1}
                            style={{ width: '100%' }}
                            disabled={submitted == true ? true : false}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[{ required: true, message: 'Please input genre!' }]}
                        hasFeedback
                    >
                        <Input disabled={submitted == true ? true : false} />
                        {/* <Select disabled={submitted == true ? true : false}>
                            <Option value='Action'>Action</Option>
                            <Option value='Adventure'>Adventure</Option>
                            <Option value='Animation'>Animation</Option>
                            <Option value='Comedy'>Comedy</Option>
                            <Option value='Crime'>Crime</Option>
                            <Option value='Drama'>Drama</Option>
                            <Option value='Fantasy'>Fantasy</Option>
                            <Option value='Historical'>Historical</Option>
                            <Option value='Horror'>Horror</Option>
                            <Option value='Mystery'>Mystery</Option>
                            <Option value='Political'>Political</Option>
                            <Option value='Romance'>Romance</Option>
                            <Option value='Saga'>Saga</Option>
                            <Option value='Satire'>Satire</Option>
                            <Option value='Science Fiction'>Science Fiction</Option>
                            <Option value='Thriller'>Thriller</Option>
                        </Select> */}
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            { required: true, message: 'Please input rating!' },
                        ]}
                        hasFeedback
                    >
                        <InputNumber
                            min={1}
                            max={10}
                            style={{ width: '100%' }}
                            disabled={submitted == true ? true : false}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Review"
                        name="review"
                        rules={[{ required: true, message: 'Please input review!' }]}
                        hasFeedback
                    >
                        <Input.TextArea rows={4} disabled={submitted == true ? true : false} />
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
                            <Link to='/movies-table'>Cancel</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    );
}

export default MoviesForm;