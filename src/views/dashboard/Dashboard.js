import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ant core
import { Layout } from 'antd';

// components
import Navbar from 'components/Navbar';
import HeaderComponent from 'components/Header';

// views
const PhotoList = React.lazy(() => import('views/photoList'));
const PhotoDetail = React.lazy(() => import('views/photoDetail'));
const NotFound = React.lazy(() => import('views/notFound'));

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
      
        {/* <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >

          
          
        </Content> */}

      </Layout>
    </Layout>
  );
}

export default Dashboard;

