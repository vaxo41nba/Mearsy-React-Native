// SET_ALL_NEWS
export const setAllNews = (payload) => ({
  type: 'SET_ALL_NEWS',
  payload,
});

// SET_CURRENT_NEWS
export const setCurrentNews = (payload) => ({
  type: 'SET_CURRENT_NEWS',
  payload,
});

// SET_DETAILED_NEWS
export const setDetailedNews = (payload) => ({
  type: 'SET_DETAILED_NEWS',
  payload,
});

// FIND_CURRENTPOST_DETAILS
export const getCurrentPostDetails = (id) => ({
  type: 'FIND_CURRENTPOST_DETAILS',
  id,
});

// SET_DETAILED_NEWS_FOR_WEEK
export const setDetailedNewsForWeek = (payload) => ({
  type: 'SET_DETAILED_NEWS_FOR_WEEK',
  payload,
});

// ADD_NEW_COMMENT
export const addNewComment = (payload) => ({
  type: 'ADD_NEW_COMMENT',
  payload,
});

// GET_ACTIVE_CATEGORIES
export const getActiveCategories = (payload) => ({
  type: 'GET_ACTIVE_CATEGORIES',
  payload,
});

// SET_ACTIVE_CATEGORIES
export const setActiveCategories = (payload) => ({
  type: 'SET_ACTIVE_CATEGORIES',
  payload,
});

// SET_HOT_NEWS
export const setHotNews = (payload) => ({
  type: 'SET_HOT_NEWS',
  payload,
});
