import { DesktopOutlined,TeamOutlined,FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import {NavLink as Link} from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  

const MyMenu = () =>{
    const items = [
        getItem('Todos', 'Todo', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('My Profile', '3', <UserOutlined />),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
      ];
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      const onClick = (e) => {
        console.log(e.key, e);
      };
    return(
        // <Menu theme="dark" onClick={onClick} defaultSelectedKeys={['1']} mode="inline" items={items} />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">
          <Link to="/todo">
          <PieChartOutlined />
            <span>Todo</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/next-item">
            <span>Next item</span>
          </Link>
        </Menu.Item>
      </Menu>
    )
}

export default MyMenu;