import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

const URL = NEXT_PUBLIC_URL_HEROKU;

export const getAllCategories = () =>
  fetch(`${URL}/categoryApi/getAllCategory`, {})
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);

export const getUserInfoById = (id) =>
  fetch(`${URL}/infoApi/userInfoByField`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      field: '_id',
      value: id,
    }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);

export const userPersonalComments = (id) =>
  fetch(`${URL}/commentApi/findPersonalComments?limit=5&page=1`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: id,
    }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((e) => e);

export const userFollowersAndReaders = (userId, subscribe) =>
  fetch(
    `${URL}/freadersApi/getUsersSubscriptions?userId=${userId}&subscribe=${subscribe}`,
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((e) => e);
