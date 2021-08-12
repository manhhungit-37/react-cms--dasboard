import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_USER } from 'actions/user.action';

const initState = {
  user: null,
  message: null
}

const reducer = (state = initState, { type, payload }) => {
  switch(type) {
    case SET_USER: {
      return {
        ...state,
        user: payload,
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        message: null
      }
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        message: payload.message
      }
    }

    case LOGOUT: {
      return {
        ...state,
        user: null
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;