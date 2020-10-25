import { Col, Row } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import CardItem from '../../components/CardItem/CardItem';

class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [
                {
                    id: 0,
                    title: "",
                    genre: "",
                    image_url: "",
                    singlePlayer: "",
                    multiplayer: "",
                    name: "",
                    platform: "",
                    release: ""
                }
            ]
        };
    }

    componentDidMount() {
        axios.get('https://backendexample.sanbersy.com/api/data-game')
            .then(response => {
                this.setState({
                    games: response.data
                })
            })
    }

    render() {
        return (
            <Row>
                {this.state.games.map((m, index) => {
                    return (
                        <Col key={index} span={6} style={{ marginBottom: '20px ' }}>
                            <CardItem
                                dataType='games'
                                id={m.id}
                                name={m.name}
                                singlePlayer={m.singlePlayer}
                                multiplayer={m.multiplayer}
                                image_url={m.image_url}
                            />
                        </Col>
                    )
                })}
            </Row>
        );
    }
}

export default Games;