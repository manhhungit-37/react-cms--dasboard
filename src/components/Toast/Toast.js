import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//toastify
import { ToastContainer, toast } from 'react-toastify';

// configs
import { STATUS_CODE } from 'configs/statusCode';

const mapStateTopProps = state => ({
  status: state.app.toast.status,
  message: state.app.toast.message
})

// //notify message error
const options = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  progress: undefined,
}
const notifyError = (msg) => toast.error(msg, options);

// //notify message error
const notifySuccess = (msg) => toast.success(msg, options);

function Toast({ status, message }) {

  useEffect(() => {
    if(!message) return;

    switch(status) {
      case STATUS_CODE[200]: {
        notifySuccess(message);
        break;
      }
      case STATUS_CODE[400]: {
        notifyError(message);
        break;
      }
      default:
        break
    }
  }, [status, message])

  return (
    <ToastContainer
      newestOnTop
      rtl={false}
      closeOnClick={false}
    />
  )
}

export default connect(mapStateTopProps, null)(Toast);
