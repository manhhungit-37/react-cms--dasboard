import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//antd
import { Form, Input, Button, Row} from 'antd';
import { LockFilled } from '@ant-design/icons';

//action
import { login } from 'actions/user.action';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = account => {
    dispatch(login(account, history));
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
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Password *"
            className="log-input"
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

export default Login;
