import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

//api
import * as photoApi from 'apis/photo.api';
import { setToast } from 'actions/app.action';

//hooks
import useIsMounted from 'hooks/useIsMounted';

function PhotoDetail() {
  const [photo, setPhoto] = useState(null);
  const isMounted = useIsMounted();
  const params = useParams();

  useEffect(() => {
    async function getPhoto() {
      try {
        const res = await photoApi.getPhoto(params.id);
        const { data } = res.data;
        if (isMounted) {
          setPhoto(data);
        }
      } catch (error) {
        setToast({ status: error.response?.status, message: "Can not get data of the photo" });
      }
    }

    getPhoto();
  }, [params.id])

  return (
    <>
      <h1 className="component-heading capitalize">Photo Detail</h1>
      {photo && (
        <div>
          <div className="flex-grid-12">
            <h4>Title</h4>
            <div>{photo.title}</div>
          </div>
          <div className="flex-grid-12">
            <h4>Category</h4>
            <div>{photo.category}</div>
          </div>
          <div className="flex-grid-12">
            <h4>Description</h4>
            <div>{photo.description}</div>
          </div>
          <div className="flex-grid-12">
            <h4>Image</h4>
            <div>
              <img src={photo.image} alt={photo.title} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoDetail
