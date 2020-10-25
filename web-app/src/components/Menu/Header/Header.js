import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderMenu = () => {
    return (
        <Header style={{ padding: 0 }}>
            <Menu style={{ float: 'right' }} theme="dark" mode="horizontal">
            </Menu>
        </Header>
    );
}

export default HeaderMenu;