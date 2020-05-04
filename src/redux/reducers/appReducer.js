import { LOADING, SEARCHING, ADD_TOAST, REMOVE_TOAST } from '../action-types';

const initialState = {
  searchValue: '',
  loading: false,
  toasts: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SEARCHING:
      return {
        ...state,
        searchValue: action.payload
      };
    case ADD_TOAST:
      return {
        ...state,
        toasts: state.toasts.concat(action.payload)
      };
    case REMOVE_TOAST: {
      const { toasts } = state;
      const index = toasts.findIndex(el => {
        return el.time === action.payload.time;
      });
      const toastsBefore = toasts.slice(0, index);
      const toastsAfter = toasts.slice(index + 1);

      return {
        ...state,
        toasts: [...toastsBefore, ...toastsAfter]
      };
    }
    default:
      return state;
  }
};

export default appReducer;
