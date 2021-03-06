import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

//antd
import { Button, Space, Table, Modal, Form, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

//helper
import { canAction } from 'helpers/canAction';

//actions
import { setToast } from 'actions/app.action';

//config
import { ACTION_NAME } from 'configs/roles';

// apis
import * as userApi from 'apis/user.api'

// hooks
import useQueryString from 'hooks/useQueryString';
import useIsMounted from 'hooks/useIsMounted';

const mapDispatchToProps = {
  setToast
}

function User({ setToast }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [userItem, setUserItem] = useState(null);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const isMounted = useIsMounted();
  
  const [form] = Form.useForm();
  const history = useHistory();
  const queryString = useQueryString();
  const page = Number(queryString.get('page')) || 1;
  const limit = Number(queryString.get('limit')) || 10;
  const [users, setUsers] = useState({
    data: [],
    limit,
    page,
    total: 10
  });
  const columns = [
    {
      title: 'Avatar',
      key: 'avatar',
      dataIndex: 'avatar',
      render: text => (
        <img src={text} alt={text} className="w-100px" />
      )
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <div>{record.firstName} {record.lastName}</div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.role !== "admin" && canAction('update', ACTION_NAME.UPDATE_USER) && (
            <Button 
              title="Edit"
              className="antd-button primary-color"
              onClick={() => {
                setIsShowEditModal(true);
                setUserItem(record);
              }}
            >
              <EditOutlined />
            </Button>
          )}
          {record.role !== "admin" && canAction('delete', ACTION_NAME.DELETE_USER) && (
            <>
              <Button 
                danger 
                title="Delete"
                className="antd-button"
                onClick={() => {
                  setIsShowDeleteModal(true)
                  setUserItem(record)
                }}
              >
                <DeleteOutlined />
              </Button>
            </>
          )}
        </Space>
      )
    },
  ];

  useEffect(() => {
    fetchUsers(users.page, users.limit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchUsers(page, limit) {
    try {
      const res = await userApi.fetchUsers(page, limit);
      const { data, page: pageSize, limit: limitSize, total } = res.data;
      data?.map(user => user.key = user._id);
      if (isMounted) {
        setUsers(prevState => ({
          ...prevState,
          page: pageSize,
          limit: limitSize,
          data,
          total
        }));
      }
    } catch (error) {
      setToast({ status: 404, message: "Can not get users" });
    }
  }

  async function deleteUser() {
    setConfirmLoading(true);
    try {
      const res = await userApi.deleteUser(userItem._id);
      const { isSucess } = res.data;
      if(!isSucess) {
        setToast({ status: 404, message: `Can't delete user` });
        return;
      }
      
      fetchUsers(users.page, users.limit);
      setToast({ status: res.status, message: res.data?.msg })
    } catch(err) {
      setToast({ status: 404, message: `Can't delete user` })
    }
    setIsShowDeleteModal(false);
    setConfirmLoading(false);
  }

  async function updateUser() {
    setConfirmLoading(true);

    try {
      const values = await form.validateFields();
      const res = await userApi.updateUser(userItem._id, values);
      const { isSucess } = res.data;
      if(!isSucess) {
        setToast({ status: 404, message: `Can't update user` })
        return;
      };
      fetchUsers(users.page, users.limit);
      setIsShowEditModal(false);
      form.resetFields();
      setToast({ status: res.status, message: res.data?.msg });
    } catch(error) {
      setToast({ status: 404, message: `Can't update user` })
    }
    setConfirmLoading(false);
  }

  function cancelEditUser() {
    form.resetFields();
    setIsShowEditModal(false)
  }

  function onChangePagination(pageNumber) {
    const { current, pageSize } = pageNumber;
    fetchUsers(current, pageSize);
    history.replace({ pathname: 'user', search: `?page=${current}&limit=${pageSize}` });
  }

  return (
    <>
      <h1 className="component-heading">Users</h1>

      <Table 
        dataSource={users.data} 
        columns={columns} 
        pagination={{ 
          total: users.total,
          defaultCurrent: users.page,
          defaultPageSize: users.limit,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100]
        }}
        onChange={onChangePagination}
      /> 

      <Modal
        title={<div>Edit User <span className="red-color">{userItem?.email}</span></div>}
        centered
        visible={isShowEditModal}
        onCancel={cancelEditUser}
        footer={[
          <Button key="cancel" htmlType="button" onClick={cancelEditUser}>
              Cancel
          </Button>,
          <Button 
            type="primary" 
            form={form} 
            loading={confirmLoading}
            key="submit" 
            htmlType="submit"
            onClick={updateUser} 
          >
              Ok
          </Button>
        ]}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          initialValues={{ 
            remember: true,
            role: "operator"
          }}
        >
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please input your role!' }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="operator">Operator</Select.Option>
              <Select.Option value="guest">Guest</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete User"
        centered
        confirmLoading={confirmLoading}
        visible={isShowDeleteModal}
        onOk={() => deleteUser()}
        onCancel={() => setIsShowDeleteModal(false)}
      >
        <div>Are you sure to delete <b className="red-color">{userItem?.email}</b> ?</div>
      </Modal>
    </>
  )
}

export default connect(null, mapDispatchToProps)(User)
