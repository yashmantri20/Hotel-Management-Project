import React from 'react'
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
    return (
        <Layout className="layout">
            <Header style={{ height: "50px" }}>
                <div className="logo" />
                <Menu style={{ lineHeight: "50px" }} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>
                    <Menu.Item key="2"><NavLink to="/hotels">Hotels</NavLink></Menu.Item>
                    <Menu.Item key="3"><NavLink to="/destinations">Destinations</NavLink></Menu.Item>
                </Menu>
            </Header>
        </Layout>
    )
}

export default Navbar
