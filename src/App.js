import React, { useEffect, Suspense } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

//guard
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

//services
import authServices from 'services/authService';

//actions
import { setUser } from 'actions/user.action';

// components
import Spin from 'components/Spin';
import Toast from 'components/Toast';

// views
const Dashboard = React.lazy(() => import('views/dashboard'));
const Login = React.lazy(() => import('views/login'));
const Register = React.lazy(() => import('views/register'));
const NotFound = React.lazy(() => import('views/notFound'));

const mapStateToProps = state => ({
  user: state.user.user,
  isSuccess: state.user.isSuccess,

})

const mapDispatchToProps = {
  setUser,
}

function App({ user, isSuccess, setUser }) {
  const history = useHistory();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await authServices.post("/api/auth", {}, {
          headers: {
            'x-auth-token': token
          }
        })
        const { user } = res.data.user;
        setUser(user);
      } catch (error) {
        window.localStorage.removeItem("token");
        history.push("/login");
      }
    }
    const token = window.localStorage.getItem("token");
    if (!token) return;

    fetchAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <>
      <Suspense fallback={<div/>}>
        <Route exact path="/">
          {user ? <Redirect to="/dashboard/report" /> : <Redirect to="/login" />}
        </Route>
        <Switch>
          <AuthGuard path="/dashboard" component={Dashboard} />
          <GuestGuard exact isRestricted path="/login" component={Login} />
          <GuestGuard exact isRestricted path="/register" component={Register} />
          <AuthGuard path="*" component={NotFound} />
        </Switch>
      </Suspense>

      <Spin />

      <Toast />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
