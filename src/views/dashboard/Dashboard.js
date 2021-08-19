import React, { useState } from 'react';
import { Switch, Route} from 'react-router-dom';

// ant core
import { Layout } from 'antd';

// components
import Navbar from 'components/Navbar';
import HeaderComponent from 'components/Header';

// views
const PhotoList = React.lazy(() => import('views/photoList'));
const PhotoDetail = React.lazy(() => import('views/photoDetail'));
const Report = React.lazy(() => import('views/report'));
const Kanban = React.lazy(() => import('views/kanban'));
const Member = React.lazy(() => import('views/member'));
const User = React.lazy(() => import('views/user'));
const AddMember = React.lazy(() => import('views/member/AddMember'));

const { Content } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed(prevState => !prevState)
  }

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
            <Route path="/dashboard/report" component={Report} />
            <Route path="/dashboard/photo/list" component={PhotoList} />
            <Route path="/dashboard/photo/:id" component={PhotoDetail} />
            <Route path="/dashboard/kanban" component={Kanban} />
            <Route path="/dashboard/member/add" component={AddMember} />
            <Route path="/dashboard/member" component={Member} />
            <Route path="/dashboard/user" component={User} />
          </Switch>
        </Content>

      </Layout>
    </Layout>
  );
}

export default Dashboard;

