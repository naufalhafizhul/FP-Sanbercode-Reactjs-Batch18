import { Table, Tag, Space, Image, Button, Tooltip, Input, Row, Form } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PopOver from '../../components/PopOver/PopOver';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

function GamesTable() {
    const { gameState, loadingState } = useContext(AppContext);
    const [game, setGame] = gameState;
    const [loading, setLoading] = loadingState;

    const [searching, setSearching] = useState('');

    const filterData = game => formatter => game.map(item => ({
        text: formatter(item),
        value: formatter(item)
    }))

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            filters: filterData(game)(i => i.name),
            sorter: (a, b) => a.name.localeCompare(b.name),
            onFilter: (value, record) =>
                record.name.indexOf(value) === 0
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            width: 100,
            filters: filterData(game)(i => i.genre),
            sorter: (a, b) => a.genre.localeCompare(b.genre),
            onFilter: (value, record) =>
                record.genre.indexOf(value) === 0
        },
        // {
        //     title: 'Single Player',
        //     dataIndex: 'singlePlayer',
        //     key: 'singlePlayer',
        //     filters: filterData(game)(i => i.singlePlayer),
        //     sorter: (a, b) => a.singlePlayer - b.singlePlayer,
        //     onFilter: (value, record) =>
        //         record.singlePlayer.toString().indexOf(value) === 0
        // },
        // {
        //     title: 'Multiplayer',
        //     dataIndex: 'multiplayer',
        //     key: 'multiplayer',
        //     filters: filterData(game)(i => i.multiplayer),
        //     sorter: (a, b) => a.multiplayer - b.multiplayer,
        //     onFilter: (value, record) =>
        //         record.multiplayer.toString().indexOf(value) === 0
        // },
        {
            title: 'Release',
            dataIndex: 'release',
            key: 'release',
            width: 100,
            filters: filterData(game)(i => i.release),
            sorter: (a, b) => a.release - b.release,
            onFilter: (value, record) =>
                record.release.toString().indexOf(value) === 0
        },
        {
            title: 'Player',
            dataIndex: 'player',
            key: 'player',
            width: 200,
            render: (text, row) =>
                <>
                    {row.singlePlayer === 1 ? <Tag color='blue' value='singlePlayer'>Single Player</Tag> : ''}
                    {row.multiplayer === 1 ? <Tag color='red' value='multiplayer'>Multiplayer</Tag> : ''}

                </>
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            width: 100,
            render: (text, row) =>
                <Tooltip title='click to show full image'>
                    <Image
                        width={50}
                        height={50}
                        src={text}
                    />
                </Tooltip>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (text, row) =>
                <>
                    <Button type='primary'>
                        <Link to={`/games-edit/${row.id}`}> Edit</Link>
                    </Button>
            &nbsp;
            &nbsp;
                    <Button type='danger'>
                        <PopOver
                            text='Delete'
                            title={`Delete ${row.name} data?`}
                            successText='Data has been deleted!'
                            value={`${row.id}`}
                            dataType={'game'}
                        />
                    </Button>
                </>
        },
    ];

    useEffect(() => {
        axios.get('https://backendexample.sanbersy.com/api/data-game')
            .then(res => {
                setGame(res.data);
                setLoading(false);
            })
    }, [loading]);

    const handleChangeSearch = (e) => {
        setSearching(e.target.value);
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        if (searching == '') {
            axios.get('https://backendexample.sanbersy.com/api/data-ga')
                .then(res => {
                    setGame(res.data);
                    setLoading(false);
                })
        } else {
            setGame(game.filter(g => g.name.toLowerCase().includes(searching.toLowerCase())));
            setLoading(false);
        }
    }

    return (
        <>
            <Row>
                <form
                    className='search'
                    onSubmit={handleSubmitSearch}
                >
                    <Form.Item
                        label="Search"
                        name="search"
                    >
                        <Input
                            name='search'
                            placeholder='Input title then press "Enter"'
                            onChange={handleChangeSearch || ''} />
                    </Form.Item>
                </form>
            </Row>

            <Button type='primary'>
                <Link to='/games-add'>
                    Add New Game
                </Link>
            </Button>
            <br />
            <br />
            <Table
                columns={columns}
                dataSource={game}
                loading={loading}
                pagination={{ pageSize: 10 }}
                rowKey={record => record.id}
                scroll={{ x: 1300, y: 350 }}
                expandable={{
                    expandedRowRender: record => [
                        <p style={{ margin: 0 }}><b>Platform:</b> {record.platform}</p>,
                        <br />,
                    ]
                }}
            />
        </>
    );
}

export default GamesTable;