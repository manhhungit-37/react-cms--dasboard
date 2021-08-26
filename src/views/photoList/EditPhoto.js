import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//views
import FormPhotos from './FormPhotos';

//api
import * as photoApi from 'apis/photo.api';

//action
import { setToast } from 'actions/app.action';

const mapDispatchToProps = {
  setToast
}

function EditPhoto({ setToast }) {
  const [photo, setPhoto] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    async function getPhoto() {
      try {
        const res = await photoApi.getPhoto(params.id);
        const { data } = res.data;
        setPhoto(data);
      } catch (error) {
        setToast({ status: error?.response.status, message: "Can not get photo" });
        history.replace('/photo/list');
      }
    }

    getPhoto();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onFinish(data) {
    setLoadingButton(true);
    try {
      const res = await photoApi.updatePhoto(photo._id, data);
      const { msg } = res.data;
      setLoadingButton(false);
      setToast({ status: res.status, message: msg });
      history.replace('/photo/list');
    } catch (error) {
      setLoadingButton(false);
      setToast({ status: error?.response.status, message: "Can not edit this photo" });
    }
  }
  return (
    <>
      {photo && <FormPhotos type="edit" photo={photo} loadingButton={loadingButton} onFinish={onFinish} />}
    </>
  )
}

export default connect(null, mapDispatchToProps)(EditPhoto)
