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
            <Route path="/dashboard/photo/list" component={PhotoList} />
            <Route path="/dashboard/photo/:id" component={PhotoDetail} />
          </Switch>
        </Content>

      </Layout>
    </Layout>
  );
}

export default Dashboard;

