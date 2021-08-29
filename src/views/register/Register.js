import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

//icons
import { LockFilled } from '@ant-design/icons'

//antd
import { Button, Input, Row, Form } from 'antd'

//action
import { setToast } from 'actions/app.action';

//api
import * as userApi from 'apis/user.api';

//services
import httpRequest from 'services/httpRequest';

const mapDispatchToProps = {
  setToast
}

const listAvatar = [
  'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg',
  'https://cdn.fakercloud.com/avatars/byryan_128.jpg',
  'https://cdn.fakercloud.com/avatars/terrorpixel_128.jpg',
  'https://cdn.fakercloud.com/avatars/madebyvadim_128.jpg',
  'https://cdn.fakercloud.com/avatars/her_ruu_128.jpg',
  'https://cdn.fakercloud.com/avatars/runningskull_128.jpg',
]

function Register({ setToast }) {
  const [imageUrl, setImageUrl] = useState(listAvatar[0]);
  const history = useHistory();

  const register = async (data, history) => {
    const res = await userApi.addUser(data);
    setToast({ status: res.status, message: res.data?.msg });
    history.replace("/login");
  }

  const onFinish = account => {
    account.avatar = imageUrl;  
    account.role = "operator";
    console.log(account);
    register(account, history);
  };

  const randomImage = imageUrl => {
    const currentIndex = listAvatar.indexOf(imageUrl);
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.trunc(Math.random() * listAvatar.length)
    }
    setImageUrl(listAvatar[newIndex]);
  }


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
        <Form.Item
          name="avatar"
          className="text-center"
        >
          <img src={imageUrl} alt={imageUrl} className="circle-img" />
        </Form.Item>
        <div className="text-center">
          <Button className="mg-bt-10" onClick={() => randomImage(imageUrl)}>RANDOM PHOTO</Button>
        </div>
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
