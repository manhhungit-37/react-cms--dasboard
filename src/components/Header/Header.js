import React from 'react'
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// ant core
import { Dropdown, Layout, Menu, Avatar } from 'antd';

// ant icon
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

//action
import { logout } from 'actions/user.action';

const { Header } = Layout;

const mapStateTopProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = {
  logout
}

function HeaderComponent({ collapsed, handleToggle, user, logout }) {
  const history = useHistory();
  const menu = user ? (
    <Menu>
      <Menu.Item key="0">
        <div className="capitalize">{user.role}</div>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/profile">My Account</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => logout(history)}>Logout</Menu.Item>
    </Menu>
  ) : <div></div>;

  return (
    <div className="header">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: handleToggle,
        })}
      </Header>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="ant-dropdown-link user-icon">
          {user && <Avatar src={user.avatar} />}
        </div>
      </Dropdown>
    </div>
  )
}

export default connect(mapStateTopProps, mapDispatchToProps)(HeaderComponent);
