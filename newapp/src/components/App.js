import { DesktopOutlined,TeamOutlined,FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb,Menu, Layout,theme } from 'antd';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, NavLink as Link} from 'react-router-dom';
import Todo from './Todo';



const { Header, Content, Footer, Sider } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Router>
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
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
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        ></Header>
            <Routes>
          <Route path='/Todo' element={<Todo/>}/>
        </Routes>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Developed ©2023 Created by Rimmel Asghar
        </Footer>
      </Layout>
    </Layout>
    </Router>
  );
};
export default App;