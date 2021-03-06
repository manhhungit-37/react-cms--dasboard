import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

//antd
import { Button, Input, Form, DatePicker, Select, Space } from 'antd';
import moment from 'moment';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

//actions
import { setToast } from 'actions/app.action';

const { Option } = Select;

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

function FormMember({ member, onFinish, loadingButton }) {
  const [imageUrl, setImageUrl] = useState(member?.avatar ?? listAvatar[0]);
  const history = useHistory();
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();

  function handleCancel() {
    history.replace("/member")
  }

  function onSubmit(account) {
    account.avatar = imageUrl; 
    onFinish(account);
    form.resetFields();
  }

  function randomImage(imageUrl) {
    const currentIndex = listAvatar.indexOf(imageUrl);
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.trunc(Math.random() * listAvatar.length);
    }
    setImageUrl(listAvatar[newIndex]);
  }

  return (
    <>
      <h1 className="component-heading capitalize">{member ? 'edit' : 'add'} Member</h1>
      <h3>Information</h3>
      <Form
        name={member ? 'edit_member' : 'add_new_member'}
        form={form}
        initialValues={member
          ? {
            firstName: member.firstName,
            lastName: member.lastName,
            position: member.position,
            email: member.email,
            dateJoin: moment('2020/10/20', dateFormat)
          } : {
            // location: [{}],
            dateJoin: moment('2020/10/20', dateFormat)
          }
        }
        onFinish={onSubmit}
      >
        <Form.Item
          name="avatar"
        >
          <img src={imageUrl} alt={imageUrl} />
        </Form.Item>
        <Button className="mg-bt-10" onClick={() => randomImage(imageUrl)} >RANDOM PHOTO</Button>
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
        <Form.List 
          name="location"
          initialValue={member ? member.location : [{}]}
        >
          {(fields, { add }) => (
            <>
              {fields.map(field => (
                <Form.Item 
                  className="half-input-container"
                  key={field.key}
                >
                  <Form.Item
                    name={[field.name, 'address']}
                    fieldKey={[field.fieldKey, 'first']}
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
                    name={[field.name, 'district']}
                    fieldKey={[field.fieldKey, 'middle']}
                    initialValue='district8'
                    className="input-30"
                    rules={[
                      {
                        required: true,
                        message: 'Please input district!',
                      },
                    ]}
                  >
                    <Select className="select-antd">
                      <Option value="district9">District 9</Option>
                      <Option value="district8">District 8</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'city']}
                    initialValue='hcm'
                    fieldKey={[field.fieldKey, 'last']}
                    className="input-30"
                    rules={[
                      {
                        required: true,
                        message: 'Please input city!',
                      },
                    ]}
                  >
                    <Select className="select-antd">
                      <Option value="hcm">TP.HCM</Option>
                      <Option value="hn">Ha Noi</Option>
                    </Select>
                  </Form.Item>
                </Form.Item>
              ))}
              <Form.Item className="text-right">
                <Button type="text" className="button-bold parent-blue primary-color" onClick={() => add()}>
                  ADD MORE
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item  className="text-right">
          <Space size="middle">
            <Button htmlType="button" onClick={handleCancel} className="right-button primary-color">
              CANCEL
            </Button>
            <Button type="primary" htmlType="submit" loading={loadingButton} className="uppercase">
              {member
                ? (
                  <span>
                    <EditOutlined />
                    &nbsp;
                    EDIT 
                  </span>
                )
                : (
                  <span>
                    <PlusOutlined /> 
                    &nbsp;
                    ADD
                  </span>
                )
              }
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default connect(null, mapDispatchToProps)(FormMember)
