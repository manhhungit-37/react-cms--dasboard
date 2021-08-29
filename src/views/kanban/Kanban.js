import React, { useEffect, useState } from 'react';

//antd
import { PlusOutlined, ToolFilled } from '@ant-design/icons';
import { Button } from 'antd';

//api 
import * as todosApi from 'apis/todos.api';

//hooks
import useIsMounted from 'hooks/useIsMounted';

function Kanban() {
  const [todos, setTodos] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await todosApi.fetchTodos(1, 99999);
        const { data } = res.data;
        data?.map(item => item.key = item._id);
        const result = data.reduce((acc, curr) => {
          if (acc[curr.status] === undefined) acc[curr.status] = [];
          acc[curr.status].push(curr);
          return acc;
        }, {})
        if (isMounted) {
          setTodos(result);
        }
      } catch (error) {
        
      }
    }

    fetchTodos();
  }, [])
  console.log(todos);

  return (
    <div>
      <div className="flex-between">
        <h1 className="component-heading">Kanban Board</h1>
        <Button type="primary" className="button-bold">
          <PlusOutlined />
          ADD TASK
        </Button>
      </div>
      <div className="kanban-container">
        <div className="kanban-item">
          <h1 className="kanban-heading kanban-heading-new">New</h1>
          {todos && todos["new"].map(todo => (
            <div key={todo.key} className="todo-item">
              <div>{todo.title}</div>
              <div>
                <button className="button-none">EDIT</button>
                <button className="button-none">VIEW</button>

              </div>
            </div>
          ))}
        </div>
        <div className="kanban-item">
          <h1 className="kanban-heading kanban-heading-inprocess">In Process</h1>
        </div>
        <div className="kanban-item">
          <h1 className="kanban-heading kanban-heading-completed">Completed</h1>
        </div>
      </div>
    </div>
  )
}

export default Kanban
