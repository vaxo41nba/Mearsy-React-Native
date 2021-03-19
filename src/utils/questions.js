import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

const URL = NEXT_PUBLIC_URL_HEROKU;

export const genPopularQuestions = (userId) =>
  fetch(`${URL}/questionsApi/getPoularQuestions?userId=${userId}`, {
  }).then((res) => res.json())
    .catch((e) => e);

export const genUserQuestions = (profileId, userId) =>
  fetch(`${URL}/questionsApi/getUsersQuestions?profileId=${profileId}&userId=${userId}`, {
  }).then((res) => res.json())
    .catch((e) => e);
