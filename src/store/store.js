import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

//reducer
import appReducer from 'reducers/app.reducer';
import userReducer from 'reducers/user.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer
})

const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;