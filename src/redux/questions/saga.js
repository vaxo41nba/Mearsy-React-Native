import { call, put, takeLatest } from 'redux-saga/effects';
import { genPopularQuestions, genUserQuestions } from '../../utils/questions';
import { setPopularQuestions, setUserQuestions } from './actions';

function* getPopularComments(action) {
  const { payload } = action;
  const userId = payload.userId === undefined || payload.userId === null
    ? payload._id
    : payload.userId;
  const pops = yield call(genPopularQuestions, userId);
  yield put(setPopularQuestions(pops));
}

function* getUserQuestions(action) {
  const { payload } = action;
  const userId = payload.userId === undefined || payload.userId === null
    ? payload._id
    : payload.userId;
  const questions = yield call(genUserQuestions, userId, userId);
  yield put(setUserQuestions(questions));
}

export default function* () {
  yield takeLatest('GET_POPULAR_QUESTIONS', getPopularComments);
  yield takeLatest('GET_USER_QUESTIONS', getUserQuestions);
}
