import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//api
import * as userApi from 'apis/user.api';

//action
import { setToast } from 'actions/app.action';

//antd
import { Table } from 'antd';

//hooks
import useSafeState from 'hooks/useSafeState';

const mapDispatchToProps = {
  setToast
}

const columns = [
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email'
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role'
  },
]

function UserReport({ setToast }) {
  const [users, setUsers] = useSafeState(null);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await userApi.fetchUsers();
        const { data } = res.data;
        data?.map(item => item.key = item._id);
        setUsers(data);
      } catch (error) {
        setToast({ status: 400, message: "Cant not get users" });
      }
    }

    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-part-box w-35">
      {users && <Table columns={columns} dataSource={users} pagination={false} title={() => <h1 className="component-heading">Users</h1>} />}
    </div>
  )
}

export default connect(null, mapDispatchToProps)(UserReport);
