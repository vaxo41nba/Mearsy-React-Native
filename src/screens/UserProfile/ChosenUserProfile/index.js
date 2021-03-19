import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';

import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomSlideshow from 'react-native-custom-slide';
import * as newsActions from '../../../redux/news/actions';
import styles from '../styles';

import ScrollViewBackground from '../../../components/CustomImageBackgrouond/ScrollviewBackground';
import MiniPlayer from '../../../components/MiniPlayer';
import NewsCard from '../../../components/NewsCard';
import Footer from '../../../components/Footer';

const ChosenProfileScreen = ({ navigation }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;
  const dispatch = useDispatch();

  const [userArticles, setUserArticles] = useState(null);
  const [checkSubscribed, findIfSubscribed] = useState(false);
  const [userFollowers, setFollowers] = useState([]);
  const [hotNews, setHotNews] = useState([]);

  const userInf = useSelector((state) => state.user.chosenUserInfo);
  const loggedUser = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  const checkUserInf = !!(userInf === undefined || userInf === null);

  useEffect(() => {
    fetch(`${URL}/freadersApi/getUserPublication`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: `${checkUserInf ? null : userInf._id}`,
        fields: ['readers', 'followers', 'news', 'podcast', 'video'],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        !res.news ? setUserArticles(null) : setUserArticles(res);

        const ifSubscribed = userInf.followers.filter(
          (i) => i === loggedUser._id,
        );
        findIfSubscribed(ifSubscribed.length === 1);
        setFollowers(userInf.followers);
      })
      .catch((err) => err);
  }, [userInf]);

  useEffect(() => {
    if (userInf) {
      if (userInf.userImportantNews.length > 0) {
        fetch(`${URL}/newsApi/getListOfNewsByTheirId`, {
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
            setHotNews(hot);
          })
          .catch((e) => e);
      }
    } else {
      null;
    }
  }, [userInf]);

  const subscribeOnUser = (followerId, readerId, action) =>
    fetch(`${URL}/freadersApi/${action}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followerId,
        readerId,
      }),
    })
      .then(() => {
        const unsubscribe = userInf.followers.filter((id) => id !== followerId);
        findIfSubscribed(!checkSubscribed);
        action === 'subscribeUser'
          ? setFollowers([...userFollowers, followerId])
          : setFollowers(unsubscribe);
      })
      .catch((e) => e);

  const updateBlackList = (userId, bannedId) =>
    fetch(`${URL}/freadersApi/blackList`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        bannedId,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((e) => e);

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
        <>
          {hotNews.length > 0 ? (
            <View style={styles.slideshowContainer}>
              <CustomSlideshow
                onClose={(index) => readArticleFromSlideShow(index)}
                renderIcon={() => false}
                items={hotNews}
                showProgressBar={false}
                footerStyle={{
                  height: '50%',
                }}
              />
            </View>
          ) : null}

          <View style={styles.profileLogOut}>
            <Icon
              name="person"
              size={60}
              color={checkTheme ? '#606060' : 'white'}
            />
            <Text style={checkTheme ? styles.titleLight : styles.titleDark}>
              {userInf.name}
              's Profile
            </Text>
          </View>
          {/* User information */}
          <View style={styles.userInfoContainer}>
            <View style={styles.circle}>
              {!userInf.avatar ? (
                <Image
                  style={styles.avatar}
                  source={require('../../../images/defaultAvatar.png')}
                />
              ) : (
                <Image
                  source={{ uri: `${userInf.avatar}` }}
                  style={styles.avatar}
                />
              )}
            </View>

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
                {userFollowers.length}
              </Text>
            </View>

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
                {userInf.readers.length}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            {checkSubscribed ? (
              <>
                <TouchableOpacity
                  style={styles.unsubscribeButton}
                  onPress={() =>
                    subscribeOnUser(
                      loggedUser._id,
                      userInf._id,
                      'unsubscribeUser',
                    )}
                >
                  <Text style={styles.unsubscribeButtonText}>Unsubscribe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.blackListButton}
                  onPress={() => updateBlackList(loggedUser._id, userInf._id)}
                >
                  <Text style={styles.buttonText}>Add to blacklist</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    subscribeOnUser(
                      loggedUser._id,
                      userInf._id,
                      'subscribeUser',
                    )}
                >
                  <Text style={styles.buttonText}>Subscribe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blackListButton}>
                  <Text style={styles.buttonText}>Add to blacklist</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View
            style={
              checkTheme
                ? styles.articlesContainerLight
                : styles.articlesContainerDark
            }
          >
            <View style={styles.userArticlesHolder}>
              <Text
                style={
                  checkTheme
                    ? styles.userArticlesTitleLight
                    : styles.userArticlesTitleDark
                }
              >
                {`${userInf.name}'s Articles`}
              </Text>
            </View>
            <View>
              {!userArticles ? (
                <View style={styles.spinnerContainer}>
                  <ActivityIndicator size="large" color="#1890ff" />
                </View>
              ) : (
                userArticles.news.map((i) => (
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
                ))
              )}
            </View>
          </View>
        </>
      </ScrollViewBackground>
      {/* Mini Player */}
      <MiniPlayer />
      {/* Footer */}
      <Footer navigation={navigation} />
    </>
  ) : null;
};

export default ChosenProfileScreen;
