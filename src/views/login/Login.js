import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

//antd
import { Form, Input, Button, Row} from 'antd';
import { LockFilled } from '@ant-design/icons';

//toastify
import { ToastContainer, toast } from 'react-toastify';

//action
import { login, setMess } from 'actions/user.action';

const mapStateTopProps = state => {
  return {
    message: state.user.message
  }
}

const mapDispatchTopProps = {
  login,
  setMess
}

const Login = ({ message, login, setMess }) => {
  const history = useHistory();

  useEffect(() => {
    if (message) {
      notify(message);
      setMess(null);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  //notify message error
  const notify = (msg) => toast.error(msg, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

  //login
  const onFinish = account => {
    login(account, history);
  };

  return (
    <div className="wrapper">
      <Row type="flex" align="center">
        <LockFilled className="lock-icon"/>
      </Row>
      <Row type="flex" align="center">
        <h2 className="log-title">Sign In</h2>
      </Row>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input placeholder="Email Address *" className="log-input" />
        </Form.Item>
        <Form.Item
          name="password"
          className="log-password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            placeholder="Password *"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button margin-r10 log-button">
            SIGN IN
          </Button>
        </Form.Item>
        <Form.Item>
            <Link to="/forgot" className="footer-log"></Link>
            <Link to="/register" className="footer-log">Don't have an account? Sign Up</Link>
        </Form.Item>
        </Form>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
    </div>
  );
};

export default connect(mapStateTopProps, mapDispatchTopProps)(Login);
