import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
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

// hooks
import useQueryString from 'hooks/useQueryString';

const mapDispatchToProps = {
  setToast
}

function User({ setToast }) {
  const queryString = useQueryString();
  const page = Number(queryString.get('page')) || 1;
  const limit = Number(queryString.get('limit')) || 10;
  const [users, setUsers] = useState({
    data: [],
    limit,
    page,
    total: 10
  });
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [userItem, setUserItem] = useState(null);
  const history = useHistory();

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
    fetchUsers(users.page, users.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchUsers(page, limit) {
    const res = await userApi.fetchUsers(page, limit);
    const { data, limit: limitSize, page: pageSize, total } = res.data;
    data?.map(user => user.key = user._id);
    const newObj = {
      data,
      limit: limitSize,
      page: pageSize,
      total
    }
    setUsers(newObj);
  }

  async function deleteUser() {
    try {
      const res = await userApi.deleteUser(userItem._id);
      const { isSucess } = res.data;
      if(!isSucess) return;
      fetchUsers(users.page, users.limit);
      setToast({ status: res.status, message: res.data?.msg })
      setIsShowDeleteModal(false)
    } catch(err) {
      setToast({ status: 404, message: `Can't delete user` })
    }
  }

  function onChangePagination(pageNumber) {
    const { current, pageSize } = pageNumber;
    setUsers(prevState => ({
      ...prevState,
      data: []
    }))
    fetchUsers(current, pageSize);

    history.replace({ pathname: 'user', search: `?page=${current}&limit=${pageSize}`});
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
