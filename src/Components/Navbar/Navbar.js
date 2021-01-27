import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import Card from '../Card/HotelCard';
import HotelCard from '../Card/HotelCard';

const { Header, Content, Footer } = Layout;

const Navbar = () => {
    return (
        <Layout className="layout">
            <Header style={{ height: "50px" }}>
                <div className="logo" />
                <Menu style={{ lineHeight: "50px" }} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">Hotels</Menu.Item>
                    <Menu.Item key="3">Destinations</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <br />
                <div className="site-layout-content"><HotelCard /></div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default Navbar
