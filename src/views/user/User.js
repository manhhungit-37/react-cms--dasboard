import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

//service
import authServices from 'services/authService';

//antd
import { Button, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';

//actions
import { canAction } from 'helpers/canAction';
import { setToast } from 'actions/app.action';

//config
import { ACTION_NAME } from 'configs/roles';

const token = window.localStorage.getItem('token');

const mapDispatchToProps = {
  setToast
}

function User({ setToast }) {
  const [users, setUsers] = useState([]);
  const [fetchDataCount, setFetchDataCount] = useState(1);
  const [isDeleteUserModalVisiable, setIsDeleteUserModalVisiable] = useState(false);
  const columns = [
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
          {canAction('update', ACTION_NAME.UPDATE_USER) && (
            <Button 
              title="Edit"
              className="antd-button primary-color"
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
                onClick={() => setIsDeleteUserModalVisiable(true)}
              >
                <DeleteOutlined />
              </Button>
              <Modal
                title="Delete User"
                centered
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                visible={isDeleteUserModalVisiable}
                onOk={() => deleteUser(record._id)}
                onCancel={() => setIsDeleteUserModalVisiable(false)}
              >
                <div>Are you sure to delete user {record.email}</div>
              </Modal>
            </>
          )}
        </Space>
      )
    },
  ];

  useEffect(() => {
    if(!token) return;
    let isUnmount = false;

    const fetchUsers = async () => {
      const res = await authServices.get('/api/user', {
        headers: {
          'x-auth-token': token
        }
      })
      const { data } = res.data;
      data?.map(user => user.key = user._id);
      if (!isUnmount) setUsers(data);
    }

    fetchUsers();

    return () => {
      isUnmount = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDataCount])

  async function deleteUser(id) {
    const res = await authServices.delete(`/api/user/${id}`, {
      headers: {
        'x-auth-token': token
      }
    })
    setFetchDataCount(prevState => prevState + 1);
    setIsDeleteUserModalVisiable(false);
    setToast({ status: res.status, message: res.data?.msg })
  }

  return (
    <div>
      <h1 className="component-heading">Users</h1>
      {users ? <Table dataSource={users} columns={columns} /> : 'No Data'}
    </div>
  )
}

export default connect(null, mapDispatchToProps)(User)
