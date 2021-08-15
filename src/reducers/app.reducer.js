import { SHOW_LOADING, HIDE_LOADING, SET_TOAST } from 'actions/app.action';

const initState = {
  isLoading: false,
  toast: {
    status: 400,
    message: ''
  }
}

const reducer = (state = initState, { type, payload }) => {
  switch(type) {
    case SHOW_LOADING: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case HIDE_LOADING: {
      return {
        ...state,
        isLoading: false,
      }
    }
    
    case SET_TOAST: {
      const { status, message } = payload;
      return {
        ...state,
        toast: {
          status,
          message
        }
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;