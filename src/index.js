import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom'; 
import './wdyr';

//guard
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

//store
import store from 'store/store';

// styles
import 'antd/dist/antd.css';
import 'index.css';
import 'react-toastify/dist/ReactToastify.css';

//services
import initRequest from 'services/initRequest';

// components
import Spin from 'components/Spin';
import Toast from 'components/Toast';

// views
const App = React.lazy(() => import('App'));
const Login = React.lazy(() => import('views/login'));
const Register = React.lazy(() => import('views/register'));

initRequest(store);

console.log("index");

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div/>}>
      <Router>
        <Switch>
          <GuestGuard exact isRestricted path="/login" component={Login} />
          <GuestGuard exact isRestricted path="/register" component={Register} />
          <AuthGuard path="/" component={App} />
        </Switch>
      </Router> 
    </Suspense>
    <Toast />
    <Spin />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
