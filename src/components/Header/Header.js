import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

// ant core
import { Button, Layout } from 'antd';

// ant icon
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

//action
import { logout } from 'actions/user.action';

const { Header } = Layout;

function HeaderComponent({ collapsed, handleToggle }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function logoutFunc() {
    dispatch(logout());
    history.push("/login");
  }

  return (
    <div className="header">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: handleToggle,
        })}
      </Header>
      <Button onClick={logoutFunc}>Logout</Button>
    </div>
  )
}

export default HeaderComponent
