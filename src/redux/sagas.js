import { all } from 'redux-saga/effects';

import userSagas from './user/saga';
import newsSagas from './news/saga';
import questionSagas from './questions/saga';

export default function* rootSaga() {
  yield all([userSagas(), newsSagas(), questionSagas()]);
}
