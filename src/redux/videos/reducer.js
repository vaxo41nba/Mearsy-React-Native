import { actionTypes } from './actions';

const INITIAL_STATE = {
  currentVideo: null,
  watchVideo: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_VIDEO_INFO:
      return {
        ...state,
        currentVideo: action.payload,
      };
    case actionTypes.SET_CURRENT_VIDEO_PLAYER:
      return {
        ...state,
        watchVideo: action.payload,
      };
    default:
      return state;
  }
};
