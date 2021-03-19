import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ScrollView, Text, TouchableOpacity, View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

import Snackbar from 'react-native-snackbar';
import CustomSlideshow from 'react-native-custom-slide';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Animatable from 'react-native-animatable';
import * as newsActions from '../../redux/news/actions';
import * as userActions from '../../redux/user/actions';

import Footer from '../../components/Footer';
import NewsCard from '../../components/NewsCard';
import SignIn from '../../components/SignIn';
import MiniPlayer from '../../components/MiniPlayer';
import ScrollViewBackground from '../../components/CustomImageBackgrouond/ScrollviewBackground';
import Tags from '../../components/NewsTags/index';

import {
  createArticlesTableIfNotFound,
  insertArticlesIntoArticlesTable,
  getArticlesTableRows,
  createHotNewsTableIfNotFound,
  insertHotNewsIntoHotNewsTable,
  getHotNewsTableRows,
  getSavedArticlesTableRows,
  createSavedArticlesTableIfNotFound,
  createVisitedArticlesTableIfNotFound,
  insertArticleIntoSavedArticlesTable,
  createPodcastTableIfNotFound,
} from '../../../OfflineDatabase';

import styles from './styles';

const MainPageScreen = ({ navigation }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const openLoginComponent = useSelector((state) => state.user.signUp);
  const userLogInf = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);
  const categoriesList = useSelector((state) => state.user.categories);
  const currentAudio = useSelector((state) => state.audio.chosenAudio);
  const offlineMode = useSelector((state) => state.user.offlineStatus);
  const news = useSelector((state) => state.news.newsList);
  const hotNews = useSelector((state) => state.news.hotNewsList);

  const activeNewsCategories = useSelector(
    (state) => state.news.activeCategories,
  );

  const [newsByCategory, setNewsByCategory] = useState([]);
  const [downloadFeedback, setDownloadFeedbackStatus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    createArticlesTableIfNotFound();
    createHotNewsTableIfNotFound();
    createSavedArticlesTableIfNotFound();
    createVisitedArticlesTableIfNotFound();
    createPodcastTableIfNotFound();
  }, []);

  useEffect(() => {
    categoriesList.length > 0 ? null : dispatch(userActions.genCategories());
    AsyncStorage.getItem('@userData').then((data) => {
      if (data) {
        dispatch(userActions.setLoginStatus(JSON.parse(data)));
      }
    });
  }, []);

  useEffect(() => {
    activeNewsCategories.length > 0
      ? null
      : dispatch(newsActions.getActiveCategories(categoriesList));
  }, []);

  useEffect(() => {
    fetch(`${URL}/newsApi/getHotNews?isFirstNews=false`)
      .then((res) => res.json())
      .then((res) => {
        const hot = res.map((i) => ({
          uri: i.sliderImage,
          title: i.circleTitle,
          text: i.author,
          id: i._id,
          description: i.description,
          thumbnail: i.thumbnail,
          date: i.date,
        }));
        if (hotNews.length !== res.length) {
          dispatch(newsActions.setHotNews(hot));
          res.map((i) => {
            insertHotNewsIntoHotNewsTable(i);
          });
        }
      })
      .catch(() => {
        getHotNewsTableRows(dispatch);
        dispatch(userActions.setOfflineStatus(true));
      });
  }, []);

  const getAllNews = (page, limit) =>
    fetch(`${URL}/newsApi/getGlobalBroadcastNews?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(userActions.setOfflineStatus(false));
        if (res.length !== news.length) {
          dispatch(newsActions.setAllNews(res));
          res.map((i) => {
            insertArticlesIntoArticlesTable(i);
          });
        }
      })
      .catch(() => {
        dispatch(userActions.setOfflineStatus(true));
        getArticlesTableRows(dispatch);
        Snackbar.show({
          text: 'Please connect to the network',
          duration: 5000,
          action: {
            text: 'UNDO',
            textColor: 'green',
          },
        });
      });

  useEffect(() => {
    getAllNews(1, 5);
  }, []);

  const getDetailedNewsOfArticles = (id) =>
    fetch(`${URL}/newsApi/findCurrentNews?data=${id}&text=true&type=id`, {
      cache: 'force-cache',
    })
      .then((res) => res.json())
      .then((res) =>
        insertArticleIntoSavedArticlesTable(
          !userLogInf._id ? userLogInf.userId : userLogInf._id,
          res,
        ))
      .catch((e) => e);

  const saveArticlesForWeekHandler = () => {
    news.map((i) => getDetailedNewsOfArticles(i._id));

    setDownloadFeedbackStatus(true);
  };

  const getNewsByCategory = (category) => {
    if (category === 'all') {
      setNewsByCategory([]);
    } else {
      fetch(`${URL}/newsApi/getNewsByCategoryList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.response === 'No news found in the selected category') {
            setNewsByCategory([]);

            Snackbar.show({
              text: 'No news found under this category,back to main news',
              duration: 3000,
              action: {
                text: 'UNDO',
                textColor: 'green',
              },
            });
          } else {
            setNewsByCategory(res);
          }
        })
        .catch((e) => e);
    }
  };

  const readArticleFromSlideShow = (index) => {
    const findNews = hotNews.filter((i) => hotNews.indexOf(i) === index);
    const chosenNews = { ...findNews };

    dispatch(
      newsActions.setCurrentNews({
        id: chosenNews[0].id,
        title: chosenNews[0].title,
        description: chosenNews[0].description,
        thumbnail: chosenNews[0].thumbnail,
        date: chosenNews[0].date,
      }),
    );
    navigation.navigate('CurrentPost');
  };

  const getUserSavedArticlesForOffline = () => {
    if (userLogInf) {
      getSavedArticlesTableRows(
        !userLogInf._id ? userLogInf.userId : userLogInf._id,
        setNewsByCategory,
      );
    }
  };

  return (
    <>
      <>
        <ScrollViewBackground>
          <>
            {hotNews ? (
              <>
                {hotNews.length > 0 ? (
                  <View style={styles.slideshowContainer}>
                    <CustomSlideshow
                      onClose={(index) => readArticleFromSlideShow(index)}
                      items={hotNews}
                      showProgressBar={false}
                      footerStyle={{
                        height: '50%',
                      }}
                      renderIcon={() => true}
                    />
                  </View>
                ) : null}
              </>
            ) : null}

            {!news || news.length === 0 ? null : (
              <>
                {offlineMode ? (
                  <>
                    {userLogInf ? (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.activeCategoriesContainer}
                      >
                        <TouchableOpacity
                          style={styles.activeCategoriesButton}
                          onPress={() => getUserSavedArticlesForOffline()}
                        >
                          <Text style={styles.activeCategoriesButtonText}>
                            Saved Articles
                          </Text>
                        </TouchableOpacity>
                      </ScrollView>
                    ) : null}
                  </>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.activeCategoriesContainer}
                  >
                    <TouchableOpacity
                      style={styles.activeCategoriesButton}
                      onPress={() => getNewsByCategory('all')}
                    >
                      <Text style={styles.activeCategoriesButtonText}>all</Text>
                    </TouchableOpacity>
                    {activeNewsCategories.map((i) => (
                      <Tags
                        key={i}
                        check={i}
                        tagName={i}
                        getNewsByCategory={getNewsByCategory}
                      />
                    ))}
                  </ScrollView>
                )}
              </>
            )}

            <View
              style={
                checkTheme
                  ? styles.cardsContainerWhite
                  : styles.cardsContainerDark
              }
            >
              <Text
                style={
                  checkTheme ? styles.headerTextLight : styles.headerTextDark
                }
              >
                NEWS & SOCIAL
              </Text>
              {userLogInf ? (
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    saveArticlesForWeekHandler();
                  }}
                >
                  <Text style={styles.secondaryButtonText}>
                    Download for week
                  </Text>
                </TouchableOpacity>
              ) : null}

              {newsByCategory.length === 0 ? (
                <>
                  {news.length === 0 ? (
                    <Text
                      style={
                        checkTheme
                          ? styles.noNewsFoundTextLight
                          : styles.noNewsFoundTextDark
                      }
                    >
                      There are no news yet
                    </Text>
                  ) : (
                    <View>
                      {news.map((i) => (
                        <NewsCard
                          fullInfo={i}
                          key={i._id}
                          id={i._id}
                          title={i.title}
                          description={i.description}
                          category={i.category}
                          thumbnail={i.thumbnail}
                          date={i.date}
                          navigation={navigation}
                        />
                      ))}
                    </View>
                  )}
                </>
              ) : (
                <>
                  {!newsByCategory ? null : (
                    <View>
                      {newsByCategory.map((i) => (
                        <NewsCard
                          key={i._id}
                          id={i._id}
                          title={i.title}
                          description={i.description}
                          category={i.category}
                          thumbnail={i.thumbnail}
                          date={i.date}
                          navigation={navigation}
                        />
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>
            {downloadFeedback ? (
              <AwesomeAlert
                show={downloadFeedback}
                showProgress={false}
                message="Articles saved for offline reading"
                showConfirmButton
                closeOnHardwareBackPress={false}
                closeOnTouchOutside={false}
                confirmText="Got It"
                confirmButtonColor="#1890ff"
                onConfirmPressed={() => {
                  setDownloadFeedbackStatus(false);
                }}
                contentContainerStyle={
                  checkTheme
                    ? { backgroundColor: 'whitesmoke' }
                    : { backgroundColor: 'white' }
                }
                messageStyle={{ fontWeight: 'bold' }}
              />
            ) : null}
          </>
          {openLoginComponent ? (
            <Animatable.View
              animation="slideInUp"
              style={styles.overlayView}
              duration={500}
            >
              <SignIn navigation={navigation} />
            </Animatable.View>
          ) : null}
        </ScrollViewBackground>
        <MiniPlayer currentAudio={currentAudio} />
        <Footer navigation={navigation} />
      </>
    </>
  );
};

export default MainPageScreen;
