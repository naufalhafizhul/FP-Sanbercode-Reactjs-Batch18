import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import { AppContext } from '../../context/AppContext';

const GamesDetail = (props) => {

    const { gameDetailState } = useContext(AppContext);

    const [gamesDetail, setGamesDetail] = gameDetailState;
    const id = props.match.params.id;

    useEffect(() => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(res => {
                setGamesDetail(res.data);
            })
    }, []);

    return (
        <ItemDetail
            detailType={'game'}
            itemTitle='Games Details'
            name={gamesDetail.name}
            genre={gamesDetail.genre}
            singlePlayer={gamesDetail.singlePlayer}
            multiplayer={gamesDetail.multiplayer}
            platform={gamesDetail.platform}
            release={gamesDetail.release}
            image_url={gamesDetail.image_url}
        />
    );
}

export default GamesDetail;