import React, { useState } from 'react'
import { useHistory } from 'react-router';

//antd
import { Input, Form, Select, Image, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const listAvatar = [
  'https://cdn.fakercloud.com/avatars/gregsqueeb_128.jpg',
  'https://cdn.fakercloud.com/avatars/aio____128.jpg',
  'https://cdn.fakercloud.com/avatars/bighanddesign_128.jpg',
  'https://cdn.fakercloud.com/avatars/guischmitt_128.jpg',
  'https://cdn.fakercloud.com/avatars/bagawarman_128.jpg'
];

function FormPhotos({ type, photo, onFinish, loadingButton }) {
  const [imageUrl, setImageUrl] = useState(photo?.image ?? listAvatar[0]);
  const history = useHistory();

  function onSubmit(photo) {
    photo.image = imageUrl;
    onFinish(photo);
  }

  function handleCancel() {
    history.replace('/photo/list');
  }

  function randomPhoto() {
    const newIndex = Math.trunc(Math.random() * listAvatar.length);
    setImageUrl(listAvatar[newIndex]);
  }

  return (
    <>
      <h1 className="component-heading capitalize">{type} photo</h1>
      <Form
        name="add_new_member"
        initialValues={type === 'edit' 
          ? {
            title: photo.title,
            category: photo.category,
            description: photo.description
          } : null
        }
        onFinish={onSubmit}
      >
        <Form.Item className="half-input-container">
          <Form.Item
            name="title"
            className="half-input"
            rules={[
              {
                required: true,
                message: 'Please input title!',
              },
            ]}
          >
            <Input 
              placeholder="Title" 
              className="log-input"
            />
          </Form.Item>
          <Form.Item
            name="category"
            className="half-input"
            rules={[
              {
                required: true,
                message: 'Please input category!',
              },
            ]}
          >
            <Select 
              className="select-antd"
              placeholder="Category"
            >
              <Select.Option value="none">None</Select.Option>
              <Select.Option value="sports">Sports</Select.Option>
              <Select.Option value="nature">Nature</Select.Option>
              <Select.Option value="fashion">Fashion</Select.Option>
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="description"
          
        >
          <TextArea 
            placeholder="Description" 
            className="antd-textarea"
          />
        </Form.Item>
        <Form.Item
          name="image"
        >
          <Image src={imageUrl} alt={imageUrl} />
        </Form.Item>
        <Button onClick={() => randomPhoto()}>RANDOM PHOTO</Button>  
        <Form.Item  className="text-right">
          <Space size="middle">
            <Button htmlType="button" onClick={handleCancel} className="right-button primary-color">
              CANCEL
            </Button>
            <Button type="primary" htmlType="submit" loading={loadingButton} className="button-bold ">
              <PlusOutlined />
              ADD
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default FormPhotos
