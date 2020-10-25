import React, { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import './Sidebar.css';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    LoginOutlined,
    LogoutOutlined,
    AimOutlined,
    ToolOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
    const { loginState } = useContext(AppContext);

    const [login, setLogin] = loginState;
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState(0);

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(true);
    };

    const handleOut = () => {
        localStorage.clear();
    }

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
        >
            <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline" style={{ height: '100%', borderRight: 0 }}>
                <div className='logo' />
                <Menu.Item key="1" icon={<ToolOutlined />}>
                    <Link to='/change-password'>Change Password</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="Movies">
                    <Menu.Item key="3"><Link to='/movies'>Show All Movies</Link></Menu.Item>
                    {
                        login === 1 || localStorage.getItem('isLogin') && localStorage.getItem('user') ?
                            <Menu.Item key="4"><Link to='/movies-table'>Manage Movies</Link></Menu.Item>
                            :
                            null
                    }

                </SubMenu>
                <SubMenu key="sub2" icon={<AimOutlined />} title="Games">
                    <Menu.Item key="5"><Link to='/games'>Show All Games</Link></Menu.Item>
                    {
                        login === 1 || localStorage.getItem('isLogin') && localStorage.getItem('user') ?
                            <Menu.Item key="6"><Link to='/games-table'>Create New Game List</Link></Menu.Item>
                            :
                            null
                    }
                </SubMenu>
                {
                    login === 1 || localStorage.getItem('isLogin') && localStorage.getItem('user') ?
                        <Menu.Item key="7" icon={<LogoutOutlined />} onClick={handleOut}>
                            <Link to='/Login/Login' >Logout</Link>
                        </Menu.Item>
                        :
                        <Menu.Item key="8" icon={<LoginOutlined />}>
                            <Link to='/Login/Login' >Login</Link>
                        </Menu.Item>
                }
            </Menu>
        </Sider>
    );
}

export default Sidebar;