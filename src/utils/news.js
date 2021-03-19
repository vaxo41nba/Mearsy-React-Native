import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

const URL = NEXT_PUBLIC_URL_HEROKU;

export const findCurrentNews = (id) =>
  fetch(`${URL}/newsApi/findCurrentNews?data=${id}&text=true&type=id`, {
    cache: 'force-cache',
  })
    .then((res) => res.json())
    .catch((e) => e);

export const getCageoryListThereAreArticles = (categories) =>
  fetch(`${URL}/categoryApi/cageoryListThereAreArticles`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      categories,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
