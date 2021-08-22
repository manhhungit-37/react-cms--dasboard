import React from 'react';

//antd
import { Button, Input, Form, DatePicker, Select, Space } from 'antd';
import moment from 'moment';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import httpRequest from 'services/httpRequest';

const { Option } = Select;

function AddMember() {
  const history = useHistory();
  const dateFormat = 'YYYY/MM/DD';

  function handleCancel() {
    history.replace("/member")
  }

  function onFinish(account) {
    const res = httpRequest.post('/api/member', account)
    console.log(account);
  }

  return (
    <>
      <h1 className="component-heading">Add Member</h1>
      <h3>Information</h3>
      <Form
        name="add_new_member"
        initialValues={{
          district: 'lucy',
          dateJoin: moment('2020/10/20', dateFormat)
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
            <Input 
              placeholder="First Name *" 
              className="log-input"
            />
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
            <Input 
              placeholder="Last Name *" 
              className="log-input"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item className="half-input-container">
          <Form.Item
            name="email"
            className="half-input"
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
              placeholder="Email"
              className="log-input"
            />
          </Form.Item>
          <Form.Item
            name="position"
            className="half-input"
            rules={[
              {
                required: true,
                message: 'Please input your position!',
              },
            ]}
          >
            <Input
              placeholder="Position *"
              className="log-input"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="dateJoin"  
          className="half-input"
        >
          <DatePicker 
            format={dateFormat} 
            className="log-input w-full"
          />
        </Form.Item>
        <h3 style={{margin: '20px 0'}}>Advance</h3>
        <Form.Item className="half-input-container">
          <Form.Item
            name="address"
            className="input-30"
            rules={[
              {
                required: true,
                message: 'Please input address!',
              },
            ]}
          >
            <Input 
              placeholder="Address *"
              className="log-input"
            />
          </Form.Item>
          <Form.Item
            name="district"
            className="input-30"
            rules={[
              {
                required: true,
                message: 'Please input district!',
              },
            ]}
          >
            <Select className="select-antd">
              <Option value="jack">District 9</Option>
              <Option value="lucy">District 8</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            className="input-30"
            rules={[
              {
                required: true,
                message: 'Please input city!',
              },
            ]}
          >
            <Input 
              placeholder="City" 
              className="log-input"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Space size="middle" className="hung">
            <Button htmlType="button" onClick={handleCancel} className="right-button">
              CANCEL
            </Button>
            <Button type="primary" htmlType="submit">
              <UsergroupAddOutlined />
              ADD
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddMember
