import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

// views
const Dashboard = lazy(() => import('views/dashboard'));
const Login = lazy(() => import('views/login'));
const Register = lazy(() => import('views/register'));
const NotFound = lazy(() => import('views/notFound'));

function App() {
  useEffect(() => {
  }, [])

  return (
     <Suspense fallback={<div>Loading</div>}>
       <Switch>
        <Route exact isRestricted path="/login" component={Login} />
        <Route exact isRestricted path="/register" component={Register} />
        <Route path="/" component={Dashboard} />
     </Switch>
     </Suspense>
  );
}

export default App;
