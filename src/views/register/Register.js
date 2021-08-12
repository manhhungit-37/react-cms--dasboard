import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';

//icons
import { LockFilled } from '@ant-design/icons'

//antd
import { Button, Input, Row, Form } from 'antd'
import { register } from 'actions/user.action';

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = account => {
    account.role = "operator";
    dispatch(register(account, history))
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
        className="login-form"
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
          <Button type="primary" htmlType="submit" className="login-form-button margin-r10 log-button">
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

export default Register