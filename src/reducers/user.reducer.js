import { LOGOUT, SET_USER, SET_IS_SUCCESS } from 'actions/user.action';

const initState = {
  user: null,
  isSuccess: false
}

const reducer = (state = initState, { type, payload }) => {
  switch(type) {
    case SET_USER: {
      return {
        ...state,
        user: payload,
      }
    }

    case SET_IS_SUCCESS: {
      return {
        ...state,
        isSuccess: payload
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