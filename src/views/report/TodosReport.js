import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

//api
import * as todosApi from 'apis/todos.api';

//action
import { setToast } from 'actions/app.action';
import { Table } from 'antd';

//hooks
import useIsMounted from 'hooks/useIsMounted';

const mapDispatchToProps = {
  setToast
}

function TodosReport({ setToast }) {
  const [todos, setTodos] = useState(null);
  const isMounted = useIsMounted();

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title"
    },
    {
      title: "Author",
      key: "author",
      dataIndex: 'author'
    },
    {
      title: "Severity",
      key: "severity",
      dataIndex: 'severity',
      render: text => <span className={`severity_${text} capitalize severity-shared`}>{text}</span>
    },
    {
      title: "Status",
      key: "status",
      dataIndex: 'status',
      render: text => <span className={`status_${text} capitalize`}>{text}</span>
    }
  ]

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await todosApi.fetchTodos();
        const { data } = res.data;
        data?.map(item => item.key = item._id);
        if (isMounted) {
          setTodos(data);
        }
      } catch (error) {
        setToast({ status: 400, message: 'Can not get members' });
      }
    }

    fetchTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-part-box w-60">
      {todos && <Table columns={columns} dataSource={todos} pagination={false} title={() => <h1 className="component-heading">Members</h1>} />}
    </div>
  )
}

export default connect(null, mapDispatchToProps)(TodosReport)
