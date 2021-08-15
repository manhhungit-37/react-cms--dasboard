import { LOGIN_SUCCESS, LOGOUT, SET_USER, SET_MESSAGE } from 'actions/user.action';

const initState = {
  user: null,
  isSuccess: false,
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
        message: null,
        isSuccess: true
      }
    }

    // case LOGIN_FAILURE: {
    //   return {
    //     ...state,
    //     message: payload.message
    //   }
    // }

    case SET_MESSAGE: {
      return {
        ...state,
        message: payload
      }
    }

    case LOGOUT: {
      return {
        ...state,
        user: null,
        isSuccess: false
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;