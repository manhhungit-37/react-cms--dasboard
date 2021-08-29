import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

//apo
import * as photoApi from 'apis/photo.api';

//action
import { setToast } from 'actions/app.action';

//antd
import { Pie } from '@ant-design/charts';
import { Table } from 'antd';

//hooks
import useSafeState from 'hooks/useSafeState';

const mapDispatchToProps = {
  setToast
}

function PhotoReport({ setToast }) {
  const [photos, setPhotos] = useSafeState(null);
  const [countObj, setCountObj] = useState(null);

  const data = [
    {
      type: 'sports',
      value: countObj?.sports,
    },
    {
      type: 'fashion',
      value: countObj?.fashion,
    },
    {
      type: 'nature',
      value: countObj?.nature,
    }
  ];

  const config = {
    appendPadding: 0,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'inner',
      offset: '-30%',
      content: function content(_ref) {
        const percent = _ref.percent;
        return ''.concat((percent * 100).toFixed(1), '%');
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  const columns = [
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      render: text => <div className="capitalize">{text}</div>
    },
    {
      title: "",
      key: "total",
      dataIndex: "total"
    }
  ]

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await photoApi.fetchPhotos(1, 99999);
        const { data } = res.data;
        const obj = data.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + 1;
          return acc;
        }, {})
        const result = Object.keys(obj).map(key => ({
          category: key,
          total: obj[key],
          key
        }))
        setCountObj(obj);
        setPhotos(result);
      } catch (error) {
        setToast({ status: 400, message: "Server Error" });
      }
    }

    fetchPhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {photos && (
        <div className="flex report-photos">
          <Table columns={columns} dataSource={photos} pagination={false} className="photo-table" />
          <Pie {...config} className="chart" />
        </div>
      )}
    </>
  )
}

export default connect(null, mapDispatchToProps)(PhotoReport)
