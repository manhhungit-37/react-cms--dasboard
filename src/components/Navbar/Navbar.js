import React from 'react'

// ant core
import {  Layout, Menu } from 'antd';

// ant icon
import {
  UserOutlined,
  FileImageOutlined,
  FileDoneOutlined,
  DashboardOutlined,
  AliwangwangOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

function Navbar({ collapsed }) {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Report
        </Menu.Item>
        <Menu.Item key="2" icon={<FileImageOutlined />}>
          Photo
        </Menu.Item>
        <Menu.Item key="3" icon={<FileDoneOutlined />}>
          Kanban
        </Menu.Item>
        <Menu.Item key="4" icon={<AliwangwangOutlined />}>
          Members
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />}>
          Users
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Navbar
