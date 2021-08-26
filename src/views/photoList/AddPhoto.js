import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//api
import * as photoApi from 'apis/photo.api';

//actions
import { setToast } from 'actions/app.action';

//views
import FormPhotos from './FormPhotos';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  setToast
}

function AddPhoto({ setToast }) {
  const [loadingButton, setLoadingButton] = useState(false);
  const history = useHistory();

  async function onFinish(photo) {
    setLoadingButton(true);
    try {
      const res = await photoApi.addPhoto(photo);
      const { msg } = res.data;
      setLoadingButton(false);
      setToast({ status: res.status, message: msg });
      history.replace('/photo/list');
    } catch (error) {
      setLoadingButton(false);
      setToast({ status: error.response.status, message: "Can not add new photo" });
    }
  }
  return (
    <>
      <FormPhotos type="add" onFinish={onFinish} loadingButton={loadingButton} />
    </>
  )
}

export default connect(null, mapDispatchToProps)(AddPhoto)
