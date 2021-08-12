import React, { useEffect, Suspense } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//guard
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

//services
import authServices from 'services/authService';

//actions
import { setUser } from 'actions/user.action';

// views
const Dashboard = React.lazy(() => import('views/dashboard'));
const Login = React.lazy(() => import('views/login'));
const Register = React.lazy(() => import('views/register'));
const NotFound = React.lazy(() => import('views/notFound'));

function App() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchAuth = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return;
      try {
        const resAuth = await authServices.post("/api/auth", {}, {
          headers: {
            'x-auth-token': token
          }
        })
        const { user } = resAuth.data.user;
        dispatch(setUser(user));
      } catch (error) {
        window.localStorage.removeItem("token");
        history.push("/login");
      }
    }
    fetchAuth();
  }, [dispatch, history])

  console.log(1);

  return (
     <Suspense fallback={<div>Loading</div>}>
       <Route exact path="/">
          {user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
       <Switch>
        <AuthGuard path="/dashboard" component={Dashboard} />
        <GuestGuard exact isRestricted path="/login" component={Login} />
        <GuestGuard exact isRestricted path="/register" component={Register} />
        <AuthGuard path="*" component={NotFound} />
      </Switch>
     </Suspense>
  );
}

export default App;
