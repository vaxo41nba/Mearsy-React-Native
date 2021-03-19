const INITIAL_STATE = {
  currentNews: null,
  detailedNews: null,
  hotNewsList: [],
  newsList: [],
  comms: [],
  activeCategories: [],
  detailedNewsForWeek: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ALL_NEWS':
      return {
        ...state,
        newsList: action.payload,
      };
    case 'SET_CURRENT_NEWS':
      return {
        ...state,
        currentNews: action.payload,
      };
    case 'SET_DETAILED_NEWS':
      return {
        ...state,
        detailedNews: action.payload,
      };
    case 'ADD_NEW_COMMENT':
      return {
        ...state,
        comms: [...state.comms, action.payload],
      };
    case 'SET_ACTIVE_CATEGORIES':
      return {
        ...state,
        activeCategories: action.payload,
      };
    case 'SET_HOT_NEWS':
      return {
        ...state,
        hotNewsList: action.payload,
      };
    case 'SET_DETAILED_NEWS_FOR_WEEK':
      return {
        ...state,
        detailedNewsForWeek: action.payload,
      };
    default:
      return state;
  }
};
