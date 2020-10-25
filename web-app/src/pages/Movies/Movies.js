import { Col, Row, Typography } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import CardItem from '../../components/CardItem/CardItem';

const { Title } = Typography;

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [
                {
                    id: 0,
                    title: "",
                    description: "",
                    year: 0,
                    duration: 0,
                    genre: "",
                    rating: 8,
                    review: null,
                    image_url: ""
                }
            ]
        };
    }

    componentDidMount() {
        axios.get('https://backendexample.sanbersy.com/api/data-movie')
            .then(response => {
                this.setState({
                    movie: response.data
                })
            })
    }

    render() {
        return (
            <Row>
                <Col span={24}>
                    <Title level={2}>Movies List</Title>
                </Col>
                <Col span={24}>
                    &nbsp;
                </Col>
                {this.state.movie.map((m, index) => {
                    return (
                        <Col key={index} span={6} style={{ marginBottom: '20px ' }}>
                            <CardItem
                                dataType='movies'
                                id={m.id}
                                title={m.title}
                                description={m.description}
                                image_url={m.image_url}
                            />
                        </Col>
                    )
                })}
            </Row>
        );
    }
}

export default Movies;