import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import socketIoClient from 'socket.io-client';
// import HTMLView from 'react-native-htmlview';
// import HTML from 'react-native-render-html';

import AwesomeAlert from 'react-native-awesome-alerts';
import * as actions from '../../../redux/news/actions';

import ViewBackground from '../../../components/CustomImageBackgrouond/ViewBackground';

import Comment from '../../../components/UserComment';
import Footer from '../../../components/Footer';

import styles from '../styles';

import {
  getCurrentSavedArticle,
  insertIntoVisitedArticlesTableRow,
  getVisitedArticleFromTable,
} from '../../../../OfflineDatabase';

const CurrentPostScreenOffline = ({ navigation }) => {
  const dispatch = useDispatch();
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const currentPost = useSelector((state) => state.news.currentNews);
  const currentPostDetails = useSelector((state) => state.news.detailedNews);
  const isLoggedIn = useSelector((state) => state.user.loginStatus);
  const userLogInf = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);
  const offlineMode = useSelector((state) => state.user.offlineStatus);
  const formatDate = new Date(currentPost.date);

  const [comments, setComments] = useState([]);
  const [newChildComment, setNewChildComment] = useState({});
  const [alertStatus, setAlertStatus] = useState(false);

  const getComms = () => {
    const controller = new AbortController();
    const { signal } = controller;
    return fetch(
      `${URL}/commentApi/getInitialCommentsForNews/?articleId=${
        currentPost.id
      }&=userId=${0}`,
      {
        signal,
      },
    )
      .then((res) => res.json())
      .then((res) => setComments(res))
      .catch((e) => e);
  };

  useEffect(() => {
    const idOfArticle = currentPost.id;
    const socket = socketIoClient(URL, {
      transports: ['websocket'],
      jsonp: false,
    });
    socket.connect();
    socket.on(`newComment${idOfArticle}`, (data) => {
      const hasParent = data.childOf.length > 0;
      if (!hasParent) {
        setComments((state) => [data, ...state]);
      } else {
        setNewChildComment(data);
      }
    });
    return () => socket.removeListener(`newComment${idOfArticle}`);
  }, [currentPost.id]);

  useEffect(() => {
    const controller = new AbortController();

    currentPostDetails
      ? insertIntoVisitedArticlesTableRow(currentPostDetails)
      : null;

    if (offlineMode) {
      getCurrentSavedArticle(currentPost.id, dispatch);
      getVisitedArticleFromTable(currentPost.id, dispatch);
    } else {
      getComms();
      dispatch(actions.getCurrentPostDetails(currentPost.id));
    }

    return function cleanUp() {
      controller.abort();
    };
  }, []);

  return (
    <ViewBackground>
      <ScrollView style={checkTheme ? styles.contentLight : styles.contentDark}>
        <View style={styles.mainContentHolder}>
          <Text
            style={
              checkTheme
                ? styles.postCategoryTextLight
                : styles.postCategoryTextDark
            }
          >
            {currentPostDetails
              ? currentPostDetails.category.toUpperCase()
              : null}
          </Text>
          <Image
            source={{ uri: `${currentPost.thumbnail}` }}
            style={styles.titleImage}
          />
          {/* Copyright Info */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text
                style={
                  checkTheme
                    ? styles.secondaryTextLight
                    : styles.secondaryTextDark
                }
              >
                {formatDate.toString().slice(3, 25)}
              </Text>
              <Text
                style={
                  checkTheme
                    ? styles.secondaryTextLight
                    : styles.secondaryTextDark
                }
              >
                Image credit:
                {currentPostDetails ? currentPostDetails.imageCredit : null}
              </Text>
              <Text
                style={
                  checkTheme
                    ? styles.secondaryTextLight
                    : styles.secondaryTextDark
                }
              >
                Author:
                {currentPostDetails ? currentPostDetails.author : null}
              </Text>
            </View>
          </View>

          {/* Title and circle */}
          <View style={styles.circleAndTitleContainer}>
            {alertStatus ? (
              <AwesomeAlert
                show={alertStatus}
                showProgress={false}
                message={`This information appears to be ${currentPostDetails.truthfulnessOfArticle}`}
                showConfirmButton
                closeOnHardwareBackPress={false}
                closeOnTouchOutside={false}
                confirmText="Got It"
                confirmButtonColor="#1890ff"
                onConfirmPressed={() => {
                  setAlertStatus(false);
                }}
                contentContainerStyle={
                  checkTheme
                    ? { backgroundColor: 'whitesmoke' }
                    : { backgroundColor: 'white' }
                }
                messageStyle={{ fontWeight: 'bold' }}
              />
            ) : null}
            <TouchableOpacity
              style={styles.smallCircle}
              onPress={() => setAlertStatus(true)}
            />
            <Text style={checkTheme ? styles.titleLight : styles.titleDark}>
              {currentPostDetails ? currentPostDetails.title : null}
            </Text>
          </View>
        </View>
        {/* Description */}
        {/* <View style={{width: '80%', alignSelf: 'center'}}>
          {currentPostDetails ? (
            <HTML source={{html: currentPostDetails.text}} />
          ) : null}
        </View> */}
        {/* Comment Input */}
        <View style={styles.commentInputHolder}>
          <Text
            style={
              checkTheme ? styles.offlineTextLight : styles.offlineTextDark
            }
          >
            Login to leave a comment
          </Text>
        </View>
        {/* Comments */}
        <View style={styles.commentsContainer}>
          {!comments || comments.lengths === 0 ? (
            <Text>Loading Comments...</Text>
          ) : (
            comments.map((com) => (
              <View key={com.id}>
                <Comment
                  checkTheme={checkTheme}
                  currentPostId={currentPost.id}
                  info={com}
                  isLoggedIn={isLoggedIn}
                  navigation={navigation}
                  userId={
                    userLogInf
                      ? !userLogInf._id
                        ? userLogInf.userId
                        : userLogInf._id
                      : null
                  }
                  token={userLogInf ? userLogInf.token : null}
                  commentId={com.id}
                  newChildComment={newChildComment}
                  getComms={getComms}
                />
                <View
                  style={{ borderBottomWidth: 1, borderColor: 'lightgrey' }}
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </ViewBackground>
  );
};

export default CurrentPostScreenOffline;
