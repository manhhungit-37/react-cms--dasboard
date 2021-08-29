import React, { useEffect, useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// ant core
import { Layout } from 'antd';

//actions
import { setUser } from 'actions/user.action';

// components
import Navbar from 'components/Navbar';
import HeaderComponent from 'components/Header';

// routes
import Routes from 'routes/Routes';

// api
import * as userApi from 'apis/user.api';

const mapDispatchToProps = {
  setUser,
}

const { Content } = Layout;

function App({ setUser }) {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed(prevState => !prevState)
  }

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await userApi.getUserAuth();
        const { user } = res.data.user;
        setUser(user);
      } catch (error) {
        window.localStorage.removeItem("accessToken");
        history.replace("/login");
      }
    }
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return;

    fetchAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Layout>
        <Navbar collapsed={collapsed} />
        <Layout className="site-layout">

          <HeaderComponent collapsed={collapsed} handleToggle={handleToggle} />
        
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >

            <Routes />
            
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default connect(null, mapDispatchToProps)(App);
