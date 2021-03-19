const INITIAL_STATE = {
  signUp: false,
  categories: [],
  selectedCategories: [],
  userSubscribedTags: [],
  userSelectedTags: [],
  userGeneralCategories: [],
  userSelectedGeneralCategories: [],
  userHotNewsList: [],
  lightTheme: false,
  subscribedTag: false,
  offlineStatus: false,
  userFollowers: null,
  userReaders: null,
  registrationStatus: null,
  loginStatus: null,
  userInfo: null,
  userPersonalComments: null,
  chosenUserInfo: null,
};

export default (state = INITIAL_STATE, action) => {
  const { categories, userGeneralCategories, userSelectedTags } = state;
  const editCategories = categories.map((i) =>
    (i.name === action.payload ? (i.chosen = !i.chosen) : i));
  const onlyActive = editCategories.filter((i) => i.chosen === true);
  const activeTagsDuplicates = userSelectedTags.filter(
    (i) => i.name === action.payload,
  );

  // const ifDuplicateFound =
  //   activeTagsDuplicates.length > 0
  //     ? userSelectedTags.filter((i) => i.name !== action.payload)
  //     : [...userSubscribedTags, {chosen: true, name: action.payload}];

  // const onlyActiveTags = editSelectedTags.filter((i) => i.chosen === true);

  const editSelectedGeneralCategories = userGeneralCategories.map((tags) =>
    (tags.name === action.payload ? (tags.chosen = !tags.chosen) : tags));

  const onlyActiveGeneralCategories = editSelectedGeneralCategories.filter(
    (i) => i.chosen === true,
  );

  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        signUp: action.payload,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    case 'SET_SELECTED':
      return {
        ...state,
        selectedCategories: onlyActive,
      };
    case 'SET_ALL':
      return {
        ...state,
        selectedCategories: action.payload,
      };
    case 'REGISTRATION_STATUS':
      return {
        ...state,
        registrationStatus: action.payload,
      };
    case 'LOGIN_STATUS':
      return {
        ...state,
        loginStatus: action.payload,
      };
    case 'SETUSER_INFO':
      return {
        ...state,
        userInfo: action.payload,
      };
    case 'SET_USER_PERSONAL_COMMENTS':
      return {
        ...state,
        userPersonalComments: action.payload,
      };
    case 'SET_CHOSEN_USER_INFO':
      return {
        ...state,
        chosenUserInfo: action.payload,
      };
    case 'SET_USER_FOLLOWERS':
      return {
        ...state,
        userFollowers: action.payload,
      };
    case 'SET_USER_READERS':
      return {
        ...state,
        userReaders: action.payload,
      };
    case 'SET_USER_SUBSCRIBED_TAGS':
      return {
        ...state,
        userSubscribedTags: [...state.userSubscribedTags, action.payload],
      };
    case 'SELECT_TAG': {
      const newArray = activeTagsDuplicates.length > 0
        ? state.userSelectedTags
        : [...state.userSelectedTags, { chosen: true, name: action.payload }];
      return {
        ...state,
        userSelectedTags: newArray,
      };
    }
    case 'SELECT_ALL_TAGS':
      return {
        ...state,
        userSelectedTags: action.payload,
      };
    case 'REMOVE_SELECTED_TAGS':
      return {
        ...state,
        userSubscribedTags: action.payload,
      };
    case 'USER_GENERAL_CATEGORIES':
      return {
        ...state,
        userGeneralCategories: [...state.userGeneralCategories, action.payload],
      };
    case 'SELECT_USER_GENERAL_CATEGORY':
      return {
        ...state,
        userSelectedGeneralCategories: onlyActiveGeneralCategories,
      };
    case 'SET_USER_THEME':
      return {
        ...state,
        lightTheme: action.payload,
      };

    case 'SET_SUBSCRIBED_TAG':
      return {
        ...state,
        subscribedTag: action.payload,
      };
    case 'SET_USER_HOT_NEWS':
      return {
        ...state,
        userHotNewsList: action.payload,
      };
    case 'SET_OFFLINE_STATUS':
      return {
        ...state,
        offlineStatus: action.payload,
      };

    default:
      return state;
  }
};
