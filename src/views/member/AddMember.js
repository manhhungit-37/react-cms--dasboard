import React from 'react';

//antd
import { Button, Input, Form, DatePicker, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

function AddMember() {
  const dateFormat = 'YYYY/MM/DD';


  function onFinish() {

  }

  return (
    <>
      <h1 className="component-heading">Add Member</h1>
      <h3>Information</h3>
      <Form
        name="add_new_member"
        className="login-form"
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
            <Input placeholder="First Name *" />
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
            <Input placeholder="Last Name *" />
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
             
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="dateJoin"  
          className="half-input"
        >
          <DatePicker 
            format={dateFormat} 
            className="log-input date-input"
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
            <Input placeholder="Address *" />
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
            <Select >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
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
            <Input placeholder="City" />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button margin-r10 log-button">
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddMember
