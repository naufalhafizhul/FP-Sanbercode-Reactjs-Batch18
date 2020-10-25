import React from 'react';
import { Card, Tag, Tooltip, Typography } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

const CardItem = (props) => {
    return (
        props.dataType === 'movies' ?
            <Link to={`/movies-detail/${props.id}`}>
                <Tooltip title={props.title}>
                    <Card
                        hoverable
                        style={{ width: 230 }}
                        cover={

                            <img
                                alt={props.title}
                                src={props.image_url}
                                width='240'
                                style={{
                                    float: 'center',
                                    objectFit: 'cover'
                                }}
                            />
                        }
                    >
                        <Meta
                            title={props.title}
                            description={<Paragraph ellipsis={{ rows: 3 }}>{props.description}</Paragraph>}
                        />
                    </Card>
                </Tooltip>
            </Link>
            :
            <Link to={`/games-detail/${props.id}`}>
                <Tooltip title={props.name}>
                    <Card
                        hoverable
                        style={{ width: 230 }}
                        cover={

                            <img
                                alt={props.name}
                                src={props.image_url}
                                width='240'
                                style={{
                                    float: 'center',
                                    objectFit: 'cover'
                                }}
                            />
                        }
                    >
                        <Meta
                            title={props.name}
                            description={
                                [props.singlePlayer === 1 ? <Tag color="blue">Single Player</Tag> : '',
                                props.multiplayer === 1 ? <Tag color="red">Multiplayer</Tag> : '']
                            }
                        />
                    </Card>
                </Tooltip>
            </Link>
    );
}

export default CardItem;