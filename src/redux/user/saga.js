import { call, put, takeLatest } from 'redux-saga/effects';

import {
  setCategories,
  setUserInfo,
  setPersonalComments,
  setChosenUserInfo,
  setUserFollowers,
  setUserReaders,
} from './actions';
import {
  getAllCategories,
  getUserInfoById,
  userPersonalComments,
  userFollowersAndReaders,
} from '../../utils/users';

function* getAllCategoriesFromAPI() {
  const categories = yield call(getAllCategories);
  const categorieNames = categories.map((i) => ({
    chosen: false,
    name: i.name,
  }));
  yield put(setCategories(categorieNames));
}

function* getCurrentUserData(action) {
  const { payload } = action;
  const { userId, token, _id } = payload;
  const checkId = userId === undefined ? _id : userId;
  const idPresented = checkId === undefined ? payload : checkId;
  const usInfo = yield call(getUserInfoById, idPresented);
  yield put(setUserInfo({ ...usInfo, token }));
}

function* getChosenUserData(action) {
  const { payload } = action;
  const { userId } = payload;
  const chosenUser = yield call(getUserInfoById, userId);
  yield put(setChosenUserInfo(chosenUser));
}

function* genUserPersonalComments(action) {
  const { payload } = action;
  const personalComments = yield call(userPersonalComments, payload.userId);
  yield put(setPersonalComments(personalComments));
}

function* genUserFollowersAndReaders(action) {
  const { payload } = action;
  const { userId } = payload;
  const followers = yield call(userFollowersAndReaders, userId, 'followers');
  const readers = yield call(userFollowersAndReaders, userId, 'readers');
  yield put(setUserFollowers(followers));
  yield put(setUserReaders(readers));
}

export default function* () {
  yield takeLatest('GENERATE_CATEGORIES', getAllCategoriesFromAPI);
  yield takeLatest('GET_USER', getCurrentUserData);
  yield takeLatest('GET_CHOSEN_USER_INFO', getChosenUserData);
  yield takeLatest(
    'GET_USER_FOLLOWERS_AND_READERS',
    genUserFollowersAndReaders,
  );
  yield takeLatest('GENERATE_USER_PERSONAL_COMMENTS', genUserPersonalComments);
}
