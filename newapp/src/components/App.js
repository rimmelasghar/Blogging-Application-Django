import { DesktopOutlined,TeamOutlined,FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb,Menu, Layout,theme } from 'antd';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, NavLink as Link} from 'react-router-dom';
import SignIn from './SignIn';
import Todo from './Todo';



const { Header, Content, Footer, Sider } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [token1, setToken] = useState({});
  const addTokenHandler = (token) =>{
    setToken(token)
  };
  console.log(token1);
  if(!token1) {
    return <SignIn addTokenHandler={addTokenHandler} />
  } else{
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
            color:"white",
            fontSize:20
          }}
        ><span>Todo's App</span></div>
        <div
          style={{
            height: 32,
            margin: 16,
            color:"white",
            fontSize:20
          }}
        ></div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">
          <Link to="/next-item">
          <UserOutlined/>
            <span>Profile</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/todo">
          <PieChartOutlined />
            <span>Todo</span>
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
          <Route path='/SignIn' element={<SignIn/>}/>
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
};
export default App;