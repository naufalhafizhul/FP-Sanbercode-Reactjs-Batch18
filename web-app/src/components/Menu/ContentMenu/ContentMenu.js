import React from 'react';
import { Layout, BackTop, Tooltip, Breadcrumb } from 'antd';
import './ContentMenu.css';
import { UpOutlined } from '@ant-design/icons';

const { Content } = Layout;
const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};

function ContentMenu(props) {
    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>&nbsp;</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {props.children}
                <Tooltip title="Back to Top">
                    <BackTop>
                        <div style={style}><UpOutlined /></div>
                    </BackTop>
                </Tooltip>
            </div>
        </Content>
    );
}

export default ContentMenu;