import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//views
import FormPhotos from './components/FormPhotos';

//api
import * as photoApi from 'apis/photo.api';

//action
import { setToast } from 'actions/app.action';

//hooks
import useIsMounted from 'hooks/useIsMounted';

const mapDispatchToProps = {
  setToast
}

function EditPhoto({ setToast }) {
  const [photo, setPhoto] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const isMounted = useIsMounted();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (!params.id) return;
    async function getPhoto() {
      try {
        const res = await photoApi.getPhoto(params.id);
        const { data } = res.data;
        if (isMounted) {
          setPhoto(data);
        }
      } catch (error) {
        setToast({ status: error?.response.status, message: "Can not get photo" });
        history.replace('/photo/list');
      }
    }

    getPhoto();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(photo);

  async function onFinish(data) {
    setLoadingButton(true);
    let res = null;
    try {
      if (!photo) {
        res = await photoApi.addPhoto(data);
      } else {
        res = await photoApi.updatePhoto(photo._id, data);
      }
      const { msg } = res.data;
      setToast({ status: res.status, message: msg });
      history.replace('/photo/list');
    } catch (error) {
      setToast({ status: error?.response.status, message: "Can not edit this photo" });
    }
    setLoadingButton(false);
  }
  return (
    <>
      {photo && <FormPhotos photo={photo} loadingButton={loadingButton} onFinish={onFinish} />}
      {Object.keys(params).length === 0 && <FormPhotos loadingButton={loadingButton} onFinish={onFinish} />}
    </>
  )
}

export default connect(null, mapDispatchToProps)(EditPhoto)
