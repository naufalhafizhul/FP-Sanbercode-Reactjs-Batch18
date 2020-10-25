import React from 'react';
import { Layout } from 'antd';
import HeaderMenu from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import ContentMenu from '../ContentMenu/ContentMenu';
import FooterMenu from '../FooterMenu/FooterMenu';

const LayoutMenu = (props) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <HeaderMenu />
                <ContentMenu>
                    {props.children}
                </ContentMenu>
                <FooterMenu />
            </Layout>
        </Layout>
    );
}

export default LayoutMenu;