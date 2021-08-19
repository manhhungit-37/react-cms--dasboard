import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

//antd
import { Form, Input, Button, Row} from 'antd';
import { LockFilled } from '@ant-design/icons';

//action
import { setToast } from 'actions/app.action';

//service
import authServices from 'services/authService';
import { setIsSuccess } from 'actions/user.action';

const mapDispatchToProps = {
  setToast,
  setIsSuccess
}

const Login = ({ setToast, setIsSuccess }) => {
  const history = useHistory();

  const login = async (data, history) =>  {
    const res = await authServices.post("/api/user/login", data, {
      headers: {
        'Content-Type': 'application/json'
      },
      showSpinner: true
    })
    const { token, msg } = res.data;
    window.localStorage.setItem("token", token);
    setIsSuccess(true);
    setToast({ status: res.status, message: msg });
    history.push("/dashboard/report");
  }

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
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);
