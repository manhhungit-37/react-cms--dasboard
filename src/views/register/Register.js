import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

//icons
import { LockFilled } from '@ant-design/icons'

//antd
import { Button, Input, Row, Form } from 'antd'

//action
import { setToast } from 'actions/app.action';

//services
import httpRequest from 'services/httpRequest';

const mapDispatchToProps = {
  setToast
}

function Register({ setToast }) {
  const history = useHistory();

  const register = async (data, history) => {
    const res = await httpRequest.post("/api/user/register", data, {
      headers: {
        'Content-Type': 'application/json'
      },
      showSpinner: true
    })
    setToast({ status: res.status, message: res.data?.msg });
    history.replace("/login");
  }

  const onFinish = account => {
    account.role = "operator";
    register(account, history);
  };

  return (
    <div className="wrapper">
      <Row type="flex" align="center">
        <LockFilled className="lock-icon"/>
      </Row>
      <Row type="flex" align="center">
        <h2 className="log-title">Sign Up</h2>
      </Row>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item className="half-input-container">
          <Form.Item
            name="firstName"
            className="half-input"
            rules={[
              {
                required: true,
                message: 'Please input first name!',
              },
            ]}
          >
            <Input placeholder="First Name *" className="log-input" />
          </Form.Item>
          <Form.Item
            name="lastName"
            className="half-input"
            rules={[
              {
                required: true,
                message: 'Please input last name!',
              },
            ]}
          >
            <Input placeholder="Last Name *" className="log-input" />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            },
            {
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please input email type"
            }
          ]}
        >
          <Input
            type="email"
            placeholder="Email Address *"
            className="log-input"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Password *"
            className="log-input"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="log-button w-full">
            SIGN UP
          </Button>
        </Form.Item>
        <Form.Item>
            <Link to="/login" className="footer-log float-right">Don't have an account? Sign In</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Register);
