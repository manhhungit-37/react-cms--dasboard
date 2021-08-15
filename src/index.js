import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App';

//store
import store from 'store/store';

// styles
import 'antd/dist/antd.css';
import 'index.css';
import 'react-toastify/dist/ReactToastify.css';

//services
import initRequest from 'services/initRequest';

initRequest(store);

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App />
    </Router> 
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
