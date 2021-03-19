import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NEXT_PUBLIC_URL_HEROKU, NEXT_PUBLIC_ADMIN_URL } from '@env'; // eslint-disable-line import/no-unresolved
import { launchImageLibrary } from 'react-native-image-picker';
import CustomSlideshow from 'react-native-custom-slide';
import styles from '../styles';

import * as userActions from '../../../redux/user/actions';
import * as newsActions from '../../../redux/news/actions';

import AddArticleOption from '../../../components/Options/AddArticle';
import AddVideoOption from '../../../components/Options/AddVideo';
import AddAudioOption from '../../../components/Options/AddAudio';
import NewsCard from '../../../components/NewsCard';
import ScrollViewBackground from '../../../components/CustomImageBackgrouond/ScrollviewBackground';
import Footer from '../../../components/Footer';
import GeneralSettings from '../../../components/UserGeneralSettings';
import MiniPlayer from '../../../components/MiniPlayer';

const PersonalProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [followers, setFollowers] = useState(null);
  const [readers, setReaders] = useState(null);
  const [addArticle, startAddingArticle] = useState(false);
  const [addVideo, startAddingVideo] = useState(false);
  const [addAudio, startAddingAudio] = useState(false);
  const [loading, startLoading] = useState(false);
  const [userArticles, setUserArticles] = useState(null);

  const userInf = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);
  const hotNews = useSelector((state) => state.user.userHotNewsList);
  const generalCategories = useSelector(
    (state) => state.user.userGeneralCategories,
  );

  const URL = NEXT_PUBLIC_URL_HEROKU;
  const ADMIN_URL = NEXT_PUBLIC_ADMIN_URL;

  const getUserDashboardInfo = (id) => {
    fetch(`${URL}/freadersApi/getUserPublication`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        fields: ['readers', 'followers', 'news', 'podcast', 'video'],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUserArticles(res.news);
        setFollowers(res.followers);
        setReaders(res.readers);
      })
      .catch((err) => err);
  };

  const getUserDetailedInfo = () => {
    AsyncStorage.getItem('@userData').then((data) => {
      dispatch(userActions.getUserInfo(JSON.parse(data)));
      dispatch(userActions.getUserFollowersAndReaders(JSON.parse(data)));
    });
  };

  useEffect(() => {
    getUserDetailedInfo();
  }, []);

  useEffect(() => {
    if (generalCategories.length > 0) {
      null;
    } else if (!userInf.selectedCategories) {
      null;
    } else {
      userInf.selectedCategories.map((tag) =>
        dispatch(
          userActions.setUserGeneralCategories({
            name: tag,
            chosen: true,
          }),
        ));
    }
  }, [userInf]);

  useEffect(() => {
    userInf ? getUserDashboardInfo(userInf._id) : navigation.navigate('Home');
  }, [userInf]);

  useEffect(() => {
    userInf
      ? fetch(`${URL}/newsApi/getListOfNewsByTheirId`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arr: userInf.userImportantNews }),
      })
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
          res.length === hotNews
            ? null
            : dispatch(userActions.setUserHotNews(hot));
        })
        .catch((e) => e)
      : null;
  }, [userInf]);

  const logOutHandler = () => {
    AsyncStorage.clear();
    dispatch(userActions.setUserInfo(null));
    dispatch(userActions.setLoginStatus(null));
    navigation.navigate('Home');
  };

  const uploadUserAvatar = (id, response) => {
    const { base64, type } = response;
    if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
      startLoading(true);
      return fetch(`${ADMIN_URL}/awsApi/uploadThumbnail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imgCode: base64, type }),
      })
        .then((res) => res.json())
        .then((res) => {
          fetch(`${URL}/userApi/updateUserInfoById`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: id,
              field: [{ avatar: res }],
            }),
          })
            .then((result) => result.json())
            .then((result) => {
              if (result === 'success') {
                startLoading(false);
                getUserDetailedInfo();
              }
            });
        })
        .catch((err) => err);
    }
  };

  // const t = async (file) => {
  //   const formData = new FormData();
  //   formData.append('name', {
  //     type: file.type,
  //     uri: file.uri,
  //     name: file.fileName,
  //   });
  //   const response = await fetch(
  //     'http://0.0.0.0.:5000/fileUploads/fileUploads',
  //     {
  //       method: 'POST',
  //       headers: {'Content-Type': 'multipart/form-data;'},
  //       body: formData,
  //     },
  //   )
  //     .then((res) => res.json())
  //     .then((res) => res)
  //     .catch((e) => e);

  //   return response;
  // };

  const selectPhotoTapped = async () => {
    launchImageLibrary({ includeBase64: false }, (response) => {
      // t(response);
      uploadUserAvatar(userInf._id, response);
    });
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

  return userInf ? (
    <>
      <ScrollViewBackground style={styles.container}>
        {hotNews.length > 0 ? (
          <View style={styles.slideshowContainer}>
            <CustomSlideshow
              renderIcon={() => false}
              onClose={(index) => readArticleFromSlideShow(index)}
              items={hotNews}
              showProgressBar={false}
              footerStyle={{
                height: '50%',
              }}
            />
          </View>
        ) : null}

        <View>
          {/* General Settings */}
          <View
            style={hotNews.length > 0 ? null : styles.generalSettingsContainer}
          >
            <GeneralSettings navigation={navigation} />
          </View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => logOutHandler()}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          {/* this one */}
          {/* User information */}
          <View style={styles.userInfoContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#1890ff" />
            ) : (
              <View style={styles.circle}>
                {!userInf.avatar ? (
                  <TouchableOpacity onPress={() => selectPhotoTapped()}>
                    <Image
                      style={styles.avatar}
                      source={require('../../../images/defaultAvatar.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => selectPhotoTapped()}>
                    <Image
                      source={{ uri: `${userInf.avatar}` }}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
            {/* this one */}
            {/* User name and surname */}
            <View style={styles.usernameHolder}>
              <Text
                style={
                  checkTheme
                    ? styles.usernameTextLight
                    : styles.usernameTextDark
                }
              >
                {userInf.name}
              </Text>
              <Text
                style={
                  checkTheme
                    ? styles.usernameTextLight
                    : styles.usernameTextDark
                }
              >
                {userInf.surname}
              </Text>
            </View>
            {/* Additional Information */}
            {/* Following */}
            <View style={styles.additionalInfoContainer}>
              <Text
                style={
                  checkTheme
                    ? styles.additionalInfoTextLight
                    : styles.additionalInfoTextDark
                }
              >
                Subscriptions
              </Text>
              <Text style={styles.additionalInfoNumber}>
                {!readers ? (
                  <ActivityIndicator size="small" color="#1890ff" />
                ) : (
                  readers.length
                )}
              </Text>
            </View>

            {/* Followers */}
            <View style={styles.additionalInfoContainer}>
              <Text
                style={
                  checkTheme
                    ? styles.additionalInfoTextLight
                    : styles.additionalInfoTextDark
                }
              >
                Subscribers
              </Text>
              <Text style={styles.additionalInfoNumber}>
                {!followers ? (
                  <ActivityIndicator size="small" color="#1890ff" />
                ) : (
                  followers.length
                )}
              </Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                startAddingVideo(!addVideo);
                startAddingArticle(false);
                startAddingAudio(false);
              }}
            >
              <Text style={styles.buttonText}>Add Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                startAddingArticle(!addArticle);
                startAddingVideo(false);
                startAddingAudio(false);
              }}
            >
              <Text style={styles.buttonText}>Add Article</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                startAddingAudio(!addAudio);
                startAddingVideo(false);
                startAddingArticle(false);
              }}
            >
              <Text style={styles.buttonText}>Add Audio</Text>
            </TouchableOpacity>
          </View>

          {!addVideo && !addArticle && !addAudio && (
            <View
              style={
                checkTheme
                  ? styles.articlesContainerLight
                  : styles.articlesContainerDark
              }
            >
              {userArticles ? (
                userArticles.length === 0 ? (
                  <Text
                    style={
                      checkTheme
                        ? styles.noArticlesTextLight
                        : styles.noArticlesTextDark
                    }
                  >
                    You have not posted any articles yet
                  </Text>
                ) : (
                  <>
                    <View style={styles.userArticlesHolder}>
                      <Text
                        style={
                          checkTheme
                            ? styles.articlesLight
                            : styles.articlesDark
                        }
                      >
                        Your Articles
                      </Text>
                    </View>
                    <View>
                      {!userArticles ? (
                        <View style={styles.spinnerContainer}>
                          <ActivityIndicator size="large" color="#1890ff" />
                        </View>
                      ) : (
                        userArticles.map((i) => (
                          <NewsCard
                            key={i._id}
                            userArticle
                            id={i._id}
                            title={i.title}
                            description={i.description}
                            category={i.category}
                            thumbnail={i.thumbnail}
                            date={i.date}
                            navigation={navigation}
                          />
                        ))
                      )}
                    </View>
                  </>
                )
              ) : null}
            </View>
          )}
        </View>

        {addVideo && (
          <AddVideoOption videoBack={() => startAddingVideo(!addVideo)} />
        )}
        {addArticle && <AddArticleOption />}
        {addAudio && (
          <AddAudioOption audioBack={() => startAddingAudio(!addAudio)} />
        )}
      </ScrollViewBackground>
      {/* Mini Player */}
      <MiniPlayer />
      {/* Footer */}
      <Footer navigation={navigation} />
    </>
  ) : null;
};

export default PersonalProfileScreen;
