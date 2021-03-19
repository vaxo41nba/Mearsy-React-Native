// GET_POPULAR_QUESTIONS
export const generatePopularComments = (payload) => ({
  type: 'GET_POPULAR_QUESTIONS',
  payload,
});

// SET_POPULAR_QUESTIONS
export const setPopularQuestions = (payload) => ({
  type: 'SET_POPULAR_QUESTIONS',
  payload,
});

// SET_CURRENT_QUESTION
export const setCurrentQuestion = (payload) => ({
  type: 'SET_CURRENT_QUESTION',
  payload,
});

// GET_USER_QUESTIONS
export const getUserQuestions = (payload) => ({
  type: 'GET_USER_QUESTIONS',
  payload,
});

// SET_USER_QUESTIONS
export const setUserQuestions = (payload) => ({
  type: 'SET_USER_QUESTIONS',
  payload,
});
