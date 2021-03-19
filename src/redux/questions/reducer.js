const INITIAL_STATE = {
  popularQuestions: [],
  currentQuestion: null,
  userQuestions: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_POPULAR_QUESTIONS':
      return {
        ...state,
        popularQuestions: action.payload,
      };
    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case 'SET_USER_QUESTIONS':
      return {
        ...state,
        userQuestions: action.payload,
      };
    default:
      return state;
  }
};
