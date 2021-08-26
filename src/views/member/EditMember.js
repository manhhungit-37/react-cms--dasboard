import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//api
import * as memberApi from 'apis/member.api';

//actions
import { setToast } from 'actions/app.action';
import FormMember from './FormMember';

const mapDispatchToProps = {
  setToast
}

function EditMember({ setToast }) {
  const [member, setMember] = useState(null);
  const[confirmLoading, setConfirmLoading] = useState(false);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getMember() {
      try {
        const res = await memberApi.getMember(params.id);
        const { data } = res.data;
        setMember(data)
      } catch (error) {
        console.log(error);
      }
    }

    getMember();
  }, [params.id])

  async function onFinish(account) {
    setConfirmLoading(true);
    try {
      account.dateJoin = account.dateJoin._i;
      account.avatar = 'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg';
      const res = await memberApi.updateMember(member._id, account);
      setToast({ status: res.status, message: res.data?.message })
      setConfirmLoading(false);
      history.replace('/member');
    } catch (error) {
      setToast({ status: error.response?.status, message: "Can not add member" })
      setConfirmLoading(false);
    }
  }

  return (
      <>
        {member && <FormMember type="edit" member={member} onFinish={onFinish} loadingButton={confirmLoading} />}
      </>
  )
}

export default connect(null, mapDispatchToProps)(EditMember)
