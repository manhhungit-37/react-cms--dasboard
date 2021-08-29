import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//api
import * as userApi from 'apis/user.api';

//action
import { setToast } from 'actions/app.action';

//antd
import { Table } from 'antd';

//hooks
import useIsMounted from 'hooks/useIsMounted';

const mapDispatchToProps = {
  setToast
}

function UserReport({ setToast }) {
  const [users, setUsers] = useState(null);
  const isMounted = useIsMounted();
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

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await userApi.fetchUsers();
        const { data } = res.data;
        data?.map(item => item.key = item._id);
        if (isMounted) {
          setUsers(data);
        }
      } catch (error) {
        setToast({ status: 400, message: "Cant not get users" });
      }
    }

    fetchUsers();
  }, [])

  return (
    <div className="w-part-box w-35">
      {users && <Table columns={columns} dataSource={users} pagination={false} title={() => <h1 className="component-heading">Users</h1>} />}
    </div>
  )
}

export default connect(null, mapDispatchToProps)(UserReport);
