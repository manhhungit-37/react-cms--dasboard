import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//antd
import { Button, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

//helper
import { canAction } from 'helpers/canAction';

//service
import httpRequest from 'services/httpRequest';

//config 
import { ACTION_NAME } from 'configs/roles';

//action
import { setToast } from 'actions/app.action';

const mapDisPatchToProps = {
  setToast
}

function Member({ setToast }) {
  const [members, setMembers] = useState([]);
  const [fetchMembersCount, setFetchMembersCount] = useState(1);
  const [isDeleteMemberModalVisible, setIsDeleteMemberModalVisible] = useState(false);
  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, member) => <div>{member.firstName} {member.lastName}</div>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {canAction('update', ACTION_NAME.UPDATE_NEW_MEMBER) && (
            <Button 
              title="Edit"
              className="antd-button primary-color"
            >
              <EditOutlined />
            </Button>
          )}
          {canAction('delete', ACTION_NAME.DELETE_MEMBER) && (
            <>
              <Button 
                danger 
                title="Delete"
                onClick={() => setIsDeleteMemberModalVisible(true)} 
                className="antd-button">
                <DeleteOutlined />
              </Button>
              <Modal
                title="Delete Member"
                centered
                visible={isDeleteMemberModalVisible}
                onOk={() => handleDeleteMember(record._id)}
                onCancel={() => setIsDeleteMemberModalVisible(false)}
              >
                Are you sure to delete 
              </Modal>
            </>
          )}
        </Space>
      )
    }
  ];

  useEffect(() => {
    let isUnMount = false;
    const fetchMembers = async () => {
      const res = await httpRequest.get('/api/member', {
        headers: {
          'x-auth-token': window.localStorage.getItem('accessToken')
        }
      })
      const { data } = res.data;
      data?.map(member => member.key = member._id);
      if (!isUnMount) setMembers(data);
    }
    
    fetchMembers();
    
    return () => {
      isUnMount = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMembersCount])

  async function handleDeleteMember(id) {
    const res = await httpRequest.delete(`/api/member:${id}`, {});
    setIsDeleteMemberModalVisible(false);
    setFetchMembersCount(prevState => prevState + 1);
    setToast({ status: res.status, message: res.data.msg})
  };

  return (
    <div>
      <div className="flex-between">
        <h1 className="component-heading">Member</h1>
        {canAction('create', ACTION_NAME.CREATE_NEW_MEMBER) && (
          <Button 
            type="primary" 
          >
            <Link to="/member/add">
              <PlusOutlined /> 
              Add
            </Link>
          </Button>
        )}
      </div>
      {members && <Table columns={columns} dataSource={members} />}
    </div>
  )
}

export default connect(null, mapDisPatchToProps)(Member)
