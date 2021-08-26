import React, { useEffect } from 'react';
import { Link, useLocation} from "react-router-dom";

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

const navList = ['/report', '/photo', '/kanban', '/member', '/user'];

function Navbar({ collapsed }) {
  const location = useLocation();
  let selectedKey = navList.findIndex(item => location.pathname.startsWith(item));

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${selectedKey + 1}`]}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/report">
            Report
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FileImageOutlined />}>
          <Link to="/photo/list">
            Photo  
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileDoneOutlined />}>
          <Link to="/kanban">
            Kanban  
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AliwangwangOutlined />}>
          <Link to="/member">
            Members  
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />}>
          <Link to="/user">
            Users  
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Navbar
