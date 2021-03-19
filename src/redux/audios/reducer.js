const INITIAL_STATE = {
  queList: [],
  chosenAudio: null,
  playing: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_AUDIO':
      return {
        ...state,
        chosenAudio: action.payload,
      };
    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.payload,
      };
    case 'SET_QUE_LIST':
      return {
        ...state,
        queList: action.payload,
      };
    default:
      return state;
  }
};
