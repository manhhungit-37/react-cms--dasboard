import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

//antd
import { Button, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

//helper
import { canAction } from 'helpers/canAction';

//config 
import { ACTION_NAME } from 'configs/roles';

//action
import { setToast } from 'actions/app.action';

// apis
import * as memberApi from 'apis/member.api'

//hooks
import useQueryString from 'hooks/useQueryString';
import useSafeState from 'hooks/useSafeState';

const mapDispatchToProps = {
  setToast
}

function Member({ setToast }) {
  const [memberItem, setMemberItem] = useState();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryString = useQueryString();
  const page = Number(queryString.get('page')) || 1;
  const limit = Number(queryString.get('limit')) || 10;
  const history = useHistory();
  const [members, setMembers] = useSafeState({
    data: [],
    limit,
    page,
    total: 1
  });

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
              <Link to={`/member/${record._id}`}>
                <EditOutlined />
              </Link>
            </Button>
          )}
          {canAction('delete', ACTION_NAME.DELETE_MEMBER) && (
            <>
              <Button 
                danger 
                title="Delete"
                onClick={() => {
                  setIsShowDeleteModal(true);
                  setMemberItem(record);
                }} 
                className="antd-button">
                <DeleteOutlined />
              </Button>
            </>
          )}
        </Space>
      )
    }
  ];

  useEffect(() => {
    fetchMembers(members.page, members.limit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchMembers(page, limit) {
    try {
      const res = await memberApi.fetchMembers(page, limit);
      const { data, total, page: currentPage, limit: limitSize } = res.data;
      data?.map(member => member.key = member._id);
      setMembers(prevState => ({
        ...prevState,
        page: currentPage,
        limit: limitSize,
        data,
        total
      }));
    } catch (error) {
      setToast({ status: 404, message: 'Can not get members' });
    }
  }

  async function handleDeleteMember() {
    setConfirmLoading(true);
    try {
      const res = await memberApi.deleteMember(memberItem._id);
      fetchMembers(members.page, members.limit);
      setIsShowDeleteModal(false);
      setConfirmLoading(false);
      setToast({ status: res.status, message: res.data.msg})
    } catch (error) {
      setIsShowDeleteModal(false);
      setConfirmLoading(false);
      setToast({ status: error?.response.status, message: error?.response.msg})
    }
  };

  function onChangePagination(pageNumber) {
    const { current, pageSize } = pageNumber;
    fetchMembers(current, pageSize);
    history.replace({ pathname: 'member', search:`?page=${current}&limit=${pageSize}` });
  }

  return (
    <div>
      <div className="flex-between">
        <h1 className="component-heading">Member</h1>
        {canAction('create', ACTION_NAME.CREATE_NEW_MEMBER) && (
          <Link to="/member/add">
            <Button 
              type="primary"
              className="button-bold"
            >
              <PlusOutlined /> 
              Add
            </Button>
          </Link>
        )}
      </div>
      {members && (
        <Table 
          columns={columns} 
          dataSource={members.data} 
          pagination={{
            total: members.total,
            defaultCurrent: members.page,
            defaultPageSize: members.limit,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100]
          }}
          onChange={onChangePagination}
        />
      )}
      <Modal
        title="Delete Member"
        centered
        confirmLoading={confirmLoading}
        visible={isShowDeleteModal}
        onOk={() => handleDeleteMember()}
        onCancel={() => setIsShowDeleteModal(false)}
      >
        Are you sure to delete member {memberItem?.email}
      </Modal>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Member)
