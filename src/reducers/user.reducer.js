import { LOGOUT, SET_USER } from 'actions/user.action';

const initState = {
  user: null,
}

const reducer = (state = initState, { type, payload }) => {
  switch(type) {
    case SET_USER: {
      return {
        ...state,
        user: payload,
      }
    }

    case LOGOUT: {
      return {
        ...state,
        user: null,
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;