import { combineReducers } from 'redux';

import user from './user/reducer';
import news from './news/reducer';
import videos from './videos/reducer';
import questions from './questions/reducer';
import audio from './audios/reducer';

const reducers = {
  user,
  news,
  videos,
  questions,
  audio,
};

const reducer = combineReducers(reducers);

export default reducer;
