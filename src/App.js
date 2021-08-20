import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// ant core
import { Layout } from 'antd';

//actions
import { setUser } from 'actions/user.action';

// components
import Navbar from 'components/Navbar';
import HeaderComponent from 'components/Header';

// api
import * as userApi from 'apis/user.api';

// views
const PhotoList = React.lazy(() => import('views/photoList'));
const PhotoDetail = React.lazy(() => import('views/photoDetail'));
const Report = React.lazy(() => import('views/report'));
const Kanban = React.lazy(() => import('views/kanban'));
const Member = React.lazy(() => import('views/member'));
const User = React.lazy(() => import('views/user'));
const AddMember = React.lazy(() => import('views/member/AddMember'));

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
        history.push("/login");
      }
    }
    const token = window.localStorage.getItem("accessToken");
    if (!token) return;

    fetchAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
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
          <Switch>
            <Route path="/photo/list" component={PhotoList} />
            <Route path="/photo/:id" component={PhotoDetail} />
            <Route path="/kanban" component={Kanban} />
            <Route path="/member/add" component={AddMember} />
            <Route path="/member" component={Member} />
            <Route path="/user" component={User} />
            <Route path="/" component={Report} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default connect(null, mapDispatchToProps)(App);
