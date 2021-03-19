import { call, put, takeLatest } from 'redux-saga/effects';

import { setDetailedNews, setActiveCategories } from './actions';

import {
  findCurrentNews,
  getCageoryListThereAreArticles,
} from '../../utils/news';

function* detailedNews(action) {
  const { id } = action;
  const detailed = yield call(findCurrentNews, id);
  yield put(setDetailedNews(detailed[0]));
}

function* activeCategories(action) {
  const { payload } = action;
  const findActives = yield call(getCageoryListThereAreArticles, payload);
  yield put(setActiveCategories(findActives));
}

export default function* () {
  yield takeLatest('FIND_CURRENTPOST_DETAILS', detailedNews);
  yield takeLatest('GET_ACTIVE_CATEGORIES', activeCategories);
}
