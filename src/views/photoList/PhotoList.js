
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

//antd
import { Button, Space, Table } from 'antd';

// hepler
import { canAction } from 'helpers/canAction';

//api
import * as photoApi from 'apis/photo.api';

//hooks
import useQueryString from 'hooks/useQueryString';

//actions
import { setToast } from 'actions/app.action';

//config
import { ACTION_NAME } from 'configs/roles';
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

const mapDispatchToProps = {
  setToast
}

function PhotoList({ setToast }) {
  const queryString = useQueryString();
  const page = Number(queryString.get('page')) || 1;
  const limit = Number(queryString.get('limit')) || 10;
  const history = useHistory();
  const[photos, setPhotos] = useState({
    data: [],
    page,
    limit,
    total: 1
  });

const columns = [
  {
    title: 'Images',
    key: 'image',
    dataIndex: 'image',
    render: text => <img src={text} alt={text} style={{width: 100}} />
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'description',
    render: (_, record) => (
      <Space size="middle">
        {canAction('update', ACTION_NAME.UPDATE_PHOTO) && (
          <Link to={`/photo/edit/${record._id}`}>
            <Button 
              title="Edit"
              className="antd-button primary-color"
            >
              <EditOutlined />
            </Button>
          </Link>
        )}
        {canAction('view', ACTION_NAME.VIEW_PHOTO) && (
          <Link to={`/photo/${record._id}`}>
            <Button 
              title="View"
              className="antd-button primary-color"
            >
              <EyeOutlined />
            </Button>
          </Link>
        )}
      </Space>
    ) 
  }
];

  useEffect(() => {
    fetchPhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchPhotos() {
    try {
      const res = await photoApi.fetchPhotos();
      const { data, total } = res.data;
      data.map(item => item.key = item._id);
      setPhotos(prevState => ({
        ...prevState,
        data,
        total
      }))
    } catch (error) {
      setToast({ status: 404, message: 'Can not get photos' });
    }
  }

  function onChangePage(pageNumber) {
    const { current, pageSize } = pageNumber;
    fetchPhotos(current, pageSize);
    history.replace({ pathname: 'user', search: `?page=${current}&limit=${pageSize}` });
  }

  return (
    <div>
      <div className="flex-between">
        <h1 className="component-heading capitalize">Photo</h1>
        <Link to="/photo/add">
          <Button type="primary" className="button-bold">
            <PlusOutlined />    
            ADD
          </Button>
        </Link>
      </div>
      {photos && <Table 
        columns={columns} 
        dataSource={photos.data} 
        pagination={{
          total: photos.total,
          defaultCurrent: photos.page,
          pagdefaultPageSizeeSize: limit,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100]
        }}
        onChange={onChangePage}
      />
      }   
    </div>
  )
}

export default connect(null, mapDispatchToProps)(PhotoList)
