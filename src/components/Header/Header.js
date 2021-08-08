import React from 'react'

// ant core
import { Layout } from 'antd';

// ant icon
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

function HeaderComponent({ collapsed, handleToggle }) {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: handleToggle,
      })}
    </Header>
  )
}

export default HeaderComponent
