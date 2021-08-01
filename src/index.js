import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import reportWebVitals from './reportWebVitals';
import App from './App';

// views
import Login from 'views/Login/Login';
import NotFound from 'views/NotFound/NotFound';

// styles
import 'antd/dist/antd.css';
import 'index.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
