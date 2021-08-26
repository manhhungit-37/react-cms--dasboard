import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

//api
import * as memberApi from 'apis/member.api';

//actions
import { setToast } from 'actions/app.action';

//views
import FormMember from './components/FormMember';

const mapDispatchToProps = {
  setToast
}

function MemberAddEdit({ setToast }) {
  const history = useHistory();
  const params = useParams();
  const [member, setMember] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [forceRender, setForceRender] = useState(Date.now());

  useEffect(() => {
    if(!params.id) return;

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

  useEffect(() => {
    if(!member) return;
    setForceRender(Date.now())
  }, [member])


  async function onFinish(account) {
    setConfirmLoading(true);
    let res = null;
    account.dateJoin = account.dateJoin._i;
    account.avatar = 'https://cdn.fakercloud.com/avatars/jodytaggart_128.jpg';
    try {
      if(!member) {
        res =  await memberApi.addMember(account);
      } else {
        res = await memberApi.updateMember(member._id, account);
      }
      setToast({ status: res.status, message: res.data?.msg });
      history.replace('/member');
    } catch (error) {
      setToast({ status: error.response?.status, message: "Can't perform action" })
    }
    setConfirmLoading(true);
  }

  return (
    <FormMember 
      key={forceRender}
      type={member ? 'edit' : 'add'} 
      member={member} 
      onFinish={onFinish} 
      loadingButton={confirmLoading} 
    />
  )
}

export default connect(null, mapDispatchToProps)(MemberAddEdit)
