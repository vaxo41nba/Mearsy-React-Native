import SQLite from 'react-native-sqlite-storage';
import * as newsActions from './src/redux/news/actions';
import * as audioActions from './src/redux/audios/actions';

// SQLite.DEBUG(true);

// ------> DATABASE Structure <------
// < --------------- > Articles Table < --------------- >
// Table - articles : {
// 	"_id"	INTEGER,
// 	"category"	TEXT,
// 	"date"	TEXT,
// 	"description"	TEXT,
// 	"isApprovedToBroadcast"	TEXT,
// 	"thumbnail"	TEXT,
// 	"title"	INTEGER,
// 	"truthfulnessOfArticle"	TEXT
// }
// < --------------- >

const db = SQLite.openDatabase(
  {
    name: 'MearsyOffline.db',
    location: 'default',
    createFromLocation: 1,
  },
  (success) => success,
);

export const createArticlesTableIfNotFound = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS articles (_id INTEGER UNIQUE,category TEXT,date TEXT,thubmnail TEXT,description TEXT,isApprovedToBroadcast TEXT,thumbnail TEXT,title TEXT,truthfulnessOfArticle TEXT)',
      [],
      (_, success) => success,
    );
  });
};

export const insertArticlesIntoArticlesTable = (articleInfo) => {
  db.transaction((tx) => {
    const {
      _id,
      category,
      date,
      description,
      isApprovedToBroadcast,
      thumbnail,
      title,
      truthfulnessOfArticle,
    } = articleInfo;
    tx.executeSql(
      'INSERT INTO articles (_id,category,date,description,isApprovedToBroadcast,thumbnail,title,truthfulnessOfArticle) VALUES ( ?,?,?,?,?,?,?,?)',
      [
        _id,
        category,
        date,
        description,
        isApprovedToBroadcast,
        thumbnail,
        title,
        truthfulnessOfArticle,
      ],
      (_, success) => success,
    );
  });
};

export const getArticlesTableRows = (foo) => {
  const itemsArray = [];
  return db.transaction((tx) => {
    tx.executeSql('SELECT * FROM articles', [], (_, results) => {
      const rowsLength = results.rows;
      if (rowsLength.length > 0) {
        for (let i = 0; i < results.rows.length; i++) {
          itemsArray.push(results.rows.item(i));
        }
        foo(newsActions.setAllNews(itemsArray));
      }
    });
  });
};

// < --------------- > Saved Articles Table < --------------- >

// userId INTEGER
// _id INTEGER,
// author TEXT,
// authorId INTEGER,
// authorName INTEGER,
// category TEXT,
// circleTitle TEXT,
// copyright TEXT,
// date TEXT,
// description TEXT
// imageCredit TEXT
// isApprovedToBroadcast TEXT
// sliderImage TEXT
// sliderImageCredit TEXT
// sliderImagePosition INTEGER
// text TEXT
// thumbnail TEXT
// thumbnailPosition INTEGER
// title TEXT

export const createSavedArticlesTableIfNotFound = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS savedarticles (userId INTEGER,_id INTEGER UNIQUE,author TEXT,authorId INTEGER,authorName TEXT,category TEXT,circleTitle TEXT,copyright TEXT,date TEXT,description TEXT,imageCredit TEXT,isApprovedToBroadcast TEXT,sliderImage TEXT,sliderImageCredit TEXT,sliderImagePosition INTEGER,text TEXT,thumbnail TEXT,thumbnailPosition INTEGER,title TEXT)',
      [],
      (_, success) => success,
    );
  });
};

export const insertArticleIntoSavedArticlesTable = (
  userId,
  currentPostDetails,
) => {
  const {
    _id,
    author,
    authorId,
    authorName,
    category,
    circleTitle,
    copyright,
    date,
    description,
    imageCredit,
    isApprovedToBroadcast,
    sliderImage,
    sliderImageCredit,
    sliderImagePosition,
    text,
    thumbnail,
    thumbnailPosition,
    title,
  } = currentPostDetails;
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO savedarticles (userId,_id, author,authorId,authorName,category,circleTitle,copyright,date,description,imageCredit,isApprovedToBroadcast,sliderImage,sliderImageCredit,sliderImagePosition,text,thumbnail,thumbnailPosition,title) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        userId,
        _id,
        author,
        authorId,
        authorName,
        category,
        circleTitle,
        copyright,
        date,
        description,
        imageCredit,
        isApprovedToBroadcast,
        sliderImage,
        sliderImageCredit,
        sliderImagePosition,
        text,
        thumbnail,
        thumbnailPosition,
        title,
      ],
      (_, success) => success,
    );
  });
};

export const getSavedArticlesTableRows = (userId, foo) => {
  const itemsArray = [];
  return db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM savedarticles WHERE userId = ?',
      [userId],
      (_, results) => {
        const rowsLength = results.rows;
        if (rowsLength.length > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            itemsArray.push(results.rows.item(i));
          }
          foo(itemsArray);
        }
      },
    );
  });
};

export const getCurrentSavedArticle = (articleId, foo) => {
  let currentArticle;
  return db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM savedarticles WHERE _id = ?',
      [articleId],
      (_, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          currentArticle = results.rows.item(i);
        }
        foo(newsActions.setDetailedNews(currentArticle));
      },
    );
  });
};

// < --------------- >

// < --------------- > Visited Articles Table < --------------- >

// _id INTEGER,
// author TEXT,
// authorId INTEGER,
// authorName INTEGER,
// category TEXT,
// circleTitle TEXT,
// copyright TEXT,
// date TEXT,
// description TEXT
// imageCredit TEXT
// isApprovedToBroadcast TEXT
// sliderImage TEXT
// sliderImageCredit TEXT
// sliderImagePosition INTEGER
// text TEXT
// thumbnail TEXT
// thumbnailPosition INTEGER
// title TEXT

export const createVisitedArticlesTableIfNotFound = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS visitedarticles (_id INTEGER UNIQUE,author TEXT,authorId INTEGER,authorName TEXT,category TEXT,circleTitle TEXT,copyright TEXT,date TEXT,description TEXT,imageCredit TEXT,isApprovedToBroadcast TEXT,sliderImage TEXT,sliderImageCredit TEXT,sliderImagePosition INTEGER,text TEXT,thumbnail TEXT,thumbnailPosition INTEGER,title TEXT)',
      [],
      (_, success) => success,
    );
  });
};

export const insertIntoVisitedArticlesTableRow = (currentArticle) => {
  const {
    _id,
    author,
    authorId,
    authorName,
    category,
    circleTitle,
    copyright,
    date,
    description,
    imageCredit,
    isApprovedToBroadcast,
    sliderImage,
    sliderImageCredit,
    sliderImagePosition,
    text,
    thumbnail,
    thumbnailPosition,
    title,
  } = currentArticle;
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO visitedarticles (_id, author,authorId,authorName,category,circleTitle,copyright,date,description,imageCredit,isApprovedToBroadcast,sliderImage,sliderImageCredit,sliderImagePosition,text,thumbnail,thumbnailPosition,title) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        _id,
        author,
        authorId,
        authorName,
        category,
        circleTitle,
        copyright,
        date,
        description,
        imageCredit,
        isApprovedToBroadcast,
        sliderImage,
        sliderImageCredit,
        sliderImagePosition,
        text,
        thumbnail,
        thumbnailPosition,
        title,
      ],
      (_, success) => success,
    );
  });
};

export const getVisitedArticleFromTable = (_id, foo) => {
  let currentItem;
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM visitedarticles WHERE _id = ? ',
      [_id],
      (_, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          currentItem = results.rows.item(i);
        }
        foo(newsActions.setDetailedNews(currentItem));
      },
    );
  });
};

// < --------------- >

// < --------------- > Hot News Table < --------------- >

// uri TEXT,
// title TEXT,
// text TEXT,
// id INTEGER,
// description TEXT,
// thumbnail TEXT,
// date TEXT,

// < --------------- >

export const createHotNewsTableIfNotFound = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS hotnews (uri TEXT,title TEXT,text TEXT,id INTEGER UNIQUE,description TEXT,thumbnail TEXT,date TEXT)',
      [],
      (_, success) => success,
    );
  });
};

export const insertHotNewsIntoHotNewsTable = (hotNews) => {
  const {
    uri, title, text, id, description, thumbnail, date,
  } = hotNews;
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO hotnews (uri,title,text,id,description,thumbnail,date) VALUES (?,?,?,?,?,?,?)',
      [uri, title, text, id, description, thumbnail, date],
      (_, success) => success,
    );
  });
};

export const getHotNewsTableRows = (foo) => {
  const itemsArray = [];
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM hotnews', [], (_, results) => {
      const rowsLength = results.rows;
      if (rowsLength.length > 0) {
        for (let i = 0; i < results.rows.length; i++) {
          itemsArray.push(results.rows.item(i));
        }
        foo(newsActions.setHotNews(itemsArray));
      }
    });
  });
};

// < --------------- > Podcast Table < --------------- >

// _id INGER
// author TEXT
// authorId INTEGER
// category TEXT
// date TEXT
// description TEXT
// imageCredit TEXT
// isApprovedToBroadcast TEXT
// link TEXT
// thumbnail TEXT
// title TEXT

export const createPodcastTableIfNotFound = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS podcasts (_id INTEGER UNIQUE,author TEXT,authorId INTEGER,category TEXT,date TEXT,description TEXT,imageCredit TEXT,isApprovedToBroadcast TEXT,link TEXT,thumbnail TEXT,title TEXT)',
      [],
      (_, success) => success,
    );
  });
};

export const insertIntoPodcastTable = (podcastDetails) => {
  const {
    _id,
    author,
    authorId,
    category,
    date,
    description,
    imageCredit,
    isApprovedToBroadcast,
    link,
    thumbnail,
    title,
  } = podcastDetails;

  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO podcasts (_id,author,authorId,category,date,description,imageCredit,isApprovedToBroadcast,link,thumbnail,title) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [
        _id,
        author,
        authorId,
        category,
        date,
        description,
        imageCredit,
        isApprovedToBroadcast,
        link,
        thumbnail,
        title,
      ],
      (_, success) => success,
    );
  });
};

export const getPodcastTableRows = (foo) => {
  const podcastArray = [];
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM podcasts', [], (_, results) => {
      const rowsLength = results.rows;
      if (rowsLength.length > 0) {
        for (let i = 0; i < results.rows.length; i++) {
          podcastArray.push(results.rows.item(i));
        }
        foo(audioActions.setQueList(podcastArray));
      }
    });
  });
};

//  < --------------- >

// < --------------- > User Info Table < --------------- >

// _id INTEGER,
// author TEXT,
// authorId INTEGER,
// authorName INTEGER,
// category TEXT,
// circleTitle TEXT,
// copyright TEXT,
// date TEXT,
// description TEXT
// imageCredit TEXT
// isApprovedToBroadcast TEXT
// sliderImage TEXT
// sliderImageCredit TEXT
// sliderImagePosition INTEGER
// text TEXT
// thumbnail TEXT
// thumbnailPosition INTEGER
// title TEXT
