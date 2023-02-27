import React from "react";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { defaultIconPrefixCls } from "antd/es/config-provider";
import { useState } from 'react';
import { Todolst  } from './Todoslst';


const { Header, Content, Footer, Sider } = Layout;


const Todo = ()=>{
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return(
        <Content
        style={{
          margin: '0 16px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Todo</Breadcrumb.Item>
        </Breadcrumb>
        <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            <Todolst/>
          </div>
      </Content>
    );
}

export default Todo;