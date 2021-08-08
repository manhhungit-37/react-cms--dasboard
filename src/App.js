import React, { useState, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// ant core
import { Layout } from 'antd';

// components
import Navbar from 'components/Navbar';
import Header from 'components/Header';

// views
const Dashboard = lazy(() => import('views/dashboard'));
const PhotoList = lazy(() => import('views/photoList'));
const PhotoDetail = lazy(() => import('views/photoDetail'));
const NotFound = lazy(() => import('views/notFound'));

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(true)

  const handleToggle = () => {
    setCollapsed(prevState => !prevState)
  }

  return (
    <Layout>
      <Navbar collapsed={collapsed} />
      <Layout className="site-layout">

        <Header collapsed={collapsed} handleToggle={handleToggle} />
      
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Suspense fallback={<div>please await...</div>}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/photo/list" component={PhotoList} />
              <Route exact path="/photo/:id" component={PhotoDetail} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Suspense>
          
        </Content>

      </Layout>
    </Layout>
    
  );
}

export default App;
