import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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
const PhotoDetail = React.lazy(() => import('views/photoList/PhotoDetail'));
const EditPhoto = React.lazy(() => import('views/photoList/EditPhoto'));
const AddPhoto = React.lazy(() => import('views/photoList/AddPhoto'));
const Report = React.lazy(() => import('views/report'));
const Kanban = React.lazy(() => import('views/kanban'));
const Member = React.lazy(() => import('views/member'));
const MemberAddEdit = React.lazy(() => import('views/member/MemberAddEdit'));
const User = React.lazy(() => import('views/user'));



const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = {
  setUser,
}

const { Content } = Layout;

function App({ user, setUser }) {
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
            
          {user && (
              <Switch>  
                <Route path="/photo/list" component={PhotoList} />
                <Route path="/photo/add/" component={AddPhoto} />
                <Route path="/photo/edit/:id" component={EditPhoto} />
                <Route path="/photo/:id" component={PhotoDetail} />
                <Route path="/kanban" component={Kanban} />
                <Route exact path="/member/add" component={MemberAddEdit} />
                <Route path="/member/:id" component={MemberAddEdit} />
                <Route path="/member" component={Member} />
                <Route path="/user" component={User} />
                <Route path="/report" component={Report} />
                <Route path="/">
                  <Redirect to="/report" />
                </Route>
              </Switch>
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
