import React, { useState } from 'react';

// ant core
import { Layout } from 'antd';

// components
import Navbar from 'components/Navbar';
import Header from 'components/Header';

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(true)

  function handleToggle() {
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
          Content
        </Content>
      </Layout>
    </Layout>
    
  );
}

export default App;
