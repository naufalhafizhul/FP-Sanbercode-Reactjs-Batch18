import { Table, Tag, Space, Image, Button, Tooltip, Input, Row, Form } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PopOver from '../../components/PopOver/PopOver';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

function MoviesTable() {
    const { movieState, loadingState } = useContext(AppContext);
    const [movie, setMovie] = movieState;
    const [loading, setLoading] = loadingState;

    const [searching, setSearching] = useState('');

    const onFinish = (values) => {
        console.log(values);
    }

    const onFinishFailed = (err) => {
        console.log(err);
    }

    const filterData = movie => formatter => movie.map(item => ({
        text: formatter(item),
        value: formatter(item)
    }))

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 150,
            filters: filterData(movie)(i => i.title),
            sorter: (a, b) => a.title.localeCompare(b.title),
            onFilter: (value, record) =>
                record.title.indexOf(value) === 0
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width: 100,
            filters: filterData(movie)(i => i.year),
            sorter: (a, b) => a.year - b.year,
            onFilter: (value, record) =>
                record.year.toString().indexOf(value) === 0
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            width: 100,
            sorter: (a, b) => a.duration - b.duration
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            width: 150,
            filters: filterData(movie)(i => i.genre),
            sorter: (a, b) => a.genre.localeCompare(b.genre),
            onFilter: (value, record) =>
                record.genre.indexOf(value) === 0
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: 100,
            filters: filterData(movie)(i => i.rating),
            sorter: (a, b) => a.rating - b.rating,
            onFilter: (value, record) =>
                record.rating.toString().indexOf(value) === 0
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            width: 150,
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
                        <Link to={`/movies-edit/${row.id}`}> Edit</Link>
                    </Button>
            &nbsp;
            &nbsp;
                    <Button type='danger'>
                        <PopOver
                            text='Delete'
                            title={`Delete ${row.title} data?`}
                            successText='Data has been deleted!'
                            value={`${row.id}`}
                            dataType={'movie'}
                        />
                    </Button>
                </>
        },
    ];

    useEffect(() => {
        axios.get('https://backendexample.sanbersy.com/api/data-movie')
            .then(res => {
                setMovie(res.data);
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
            axios.get('https://backendexample.sanbersy.com/api/data-movie')
                .then(res => {
                    setMovie(res.data);
                    setLoading(false);
                })
        } else {
            setMovie(movie.filter(m => m.title.toLowerCase().includes(searching.toLowerCase())));
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
                <Link to='/movies-add'>
                    Add New Movie
                </Link>
            </Button>
            <br />
            <br />
            <Table
                columns={columns}
                dataSource={movie}
                loading={loading}
                pagination={{ pageSize: 10 }}
                rowKey={record => record.id}
                scroll={{ x: 1300, y: 350 }}
                expandable={{
                    expandedRowRender: record => [
                        <p style={{ margin: 0 }}><b>Description:</b> {record.description}</p>,
                        <br />,
                        <p style={{ margin: 0 }}><b>Review:</b> {record.review}</p>,
                        <br />,
                    ]
                }}
            />
        </>
    );
}

export default MoviesTable;