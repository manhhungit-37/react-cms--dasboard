import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

//api
import * as memberApi from 'apis/member.api';

//actions
import { setToast } from 'actions/app.action';

//views
import FormMember from './FormMember';

const mapDispatchToProps = {
  setToast
}

function AddMember({ setToast }) {
  const history = useHistory();
  const[confirmLoading, setConfirmLoading] = useState(false);

  async function onFinish(account) {
    setConfirmLoading(true);
    try {
      account.dateJoin = account.dateJoin._i;
      account.avatar = 'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg';
      const res = await memberApi.addMember(account);
      setToast({ status: res.status, message: res.data?.message });
      setConfirmLoading(true);
      history.replace('/member');
    } catch (error) {
      setToast({ status: error.response?.status, message: "Can not add member" })
      setConfirmLoading(true);
    }
  }

  return (
    <>
      <FormMember type="add" onFinish={onFinish} loadingButton={confirmLoading} />
    </>
  )
}

export default connect(null, mapDispatchToProps)(AddMember)
