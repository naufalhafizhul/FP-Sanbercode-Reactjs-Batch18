import React, { useContext } from 'react';
import { Button, Card, Col, Descriptions, Image, PageHeader, Row, Tag, Tooltip, Typography } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const { Meta } = Card;
const { Title } = Typography;

const ItemDetail = (props) => {
    const { loginState } = useContext(AppContext);

    const [login, setLogin] = loginState;
    return (
        props.detailType === 'movies' ?
            <>
                <Title level={2}>{props.title}</Title>
                <Row>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<Image alt={props.title} src={props.image_url} />}
                        >
                            <Meta description={`Image of ${props.title}`} />
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Descriptions title='Detail' layout='vertical'>
                            <Descriptions.Item label='Title'>{props.title}</Descriptions.Item>
                            <Descriptions.Item label='Year'>{props.year}</Descriptions.Item>
                            <Descriptions.Item label='Rating'>{props.rating} of 10</Descriptions.Item>
                            <Descriptions.Item label='Genre'>{props.genre}</Descriptions.Item>
                            <Descriptions.Item label='Duration'>{props.duration} min</Descriptions.Item>
                        </Descriptions>
                        <Card>
                            <p><b>Description:</b></p>
                            <p>{props.description}</p>
                            <p><b>Review:</b></p>
                            <p>{props.review == '' ? 'No review has been added' : props.review}</p>
                            <p>
                                <Tooltip title='Back to Movies'>
                                    <Link to='/movies'>
                                        <Button shape='circle' type='default' icon={<ArrowLeftOutlined />} />
                                    </Link>
                                </Tooltip>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </>
            :
            <>
                <Title level={2}>{props.name}</Title>
                <Row>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<Image alt={props.name} src={props.image_url} />}
                        >
                            <Meta description={`Image of ${props.name}`} />
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Descriptions title='Detail' layout='vertical'>
                            <Descriptions.Item label='Platform'>{props.platform}</Descriptions.Item>
                            <Descriptions.Item label='Genre'>{props.genre}</Descriptions.Item>
                            <Descriptions.Item label='Release'>{props.release}</Descriptions.Item>
                            <Descriptions.Item>{
                                [props.singlePlayer === 1 ? <Tag color="blue">Single Player</Tag> : '',
                                props.multiplayer === 1 ? <Tag color="red">Multiplayer</Tag> : '']
                            }</Descriptions.Item>
                        </Descriptions>
                        <Card>
                            <p>
                                <Tooltip title='Back to Games'>
                                    <Link to='/games'>
                                        <Button shape='circle' type='default' icon={<ArrowLeftOutlined />} />
                                    </Link>
                                </Tooltip>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </>
    );
}

export default ItemDetail;