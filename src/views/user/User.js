import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

//antd
import { Button, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';

//actions
import { canAction } from 'helpers/canAction';
import { setToast } from 'actions/app.action';

//config
import { ACTION_NAME } from 'configs/roles';

// apis
import * as userApi from 'apis/user.api'

const mapDispatchToProps = {
  setToast
}

function User({ setToast }) {
  const [users, setUsers] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [userItem, setUserItem] = useState(null);

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
    fetchUsers();
  }, [])

  // handle infinite scroll
  function handleScroll() {
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)  return
    console.log(2321)
      fetchUsers()
  
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  async function fetchUsers() {
    const res = await userApi.fetchUsers();
    const { data } = res.data;
    data?.map(user => user.key = user._id);
    setUsers(data);
  }

  async function deleteUser() {
    try {
      const res = await userApi.deleteUser(userItem._id);
      const { isSucess } = res.data;
      if(!isSucess) return;

      fetchUsers();
      setToast({ status: res.status, message: res.data?.msg })
      setIsShowDeleteModal(false)
    } catch(err) {
      setToast({ status: 404, message: `Can't delete user` })
    }
  }


  return (
    <>
      <h1 className="component-heading">Users</h1>

      {users ? <Table dataSource={users} columns={columns} /> : 'No Data'}

      <Modal
        title="Delete User"
        centered
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        visible={isShowDeleteModal}
        onOk={() => deleteUser()}
        onCancel={() => setIsShowDeleteModal(false)}
      >
        <div>Are you sure to delete user {userItem?.email}</div>
      </Modal>
    </>
  )
}

export default connect(null, mapDispatchToProps)(User)
