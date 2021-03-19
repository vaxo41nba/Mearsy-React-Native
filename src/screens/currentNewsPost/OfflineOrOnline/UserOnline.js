import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import socketIoClient from 'socket.io-client';
// import HTMLView from 'react-native-htmlview';
// import HTML from 'react-native-render-html';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as actions from '../../../redux/news/actions';

import ViewBackground from '../../../components/CustomImageBackgrouond/ViewBackground';

import CommentInput from '../../../components/InputForComments';
import Comment from '../../../components/UserComment';
import Footer from '../../../components/Footer';

import styles from '../styles';

import {
  getCurrentSavedArticle,
  insertArticleIntoSavedArticlesTable,
  insertIntoVisitedArticlesTableRow,
  getVisitedArticleFromTable,
} from '../../../../OfflineDatabase';

const CurrentPostScreenOnline = ({ navigation }) => {
  const dispatch = useDispatch();
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const currentPost = useSelector((state) => state.news.currentNews);
  const currentPostDetails = useSelector((state) => state.news.detailedNews);
  const isLoggedIn = useSelector((state) => state.user.loginStatus);
  const offlineMode = useSelector((state) => state.user.offlineStatus);
  const userLogInf = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  const formatDate = new Date(currentPost.date);

  const [postComment, setComment] = useState(null);
  const [reportResponseText, setReportResponseText] = useState('');
  const [comments, setComments] = useState([]);
  const [newChildComment, setNewChildComment] = useState({});
  const [alertStatus, setAlertStatus] = useState(false);
  const [articleOptions, setArticleOptions] = useState(false);
  const [reportResponseStatus, setReportResponseStatus] = useState(false);
  const [downloadFeedback, setDownloadFeedbackStatus] = useState(false);

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

  const addNewComment = () => {
    const comment = {
      parentId: undefined,
      messageBody: postComment,
      authorId: !userLogInf.userId ? userLogInf._id : userLogInf.userId,
      newsId: currentPost.id,
      repliedToId: undefined,
    };

    fetch(`${URL}/commentApi/createComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userLogInf.token,
      },
      body: JSON.stringify({ ...comment }),
    });
  };

  const createArticleReport = (cause) => {
    fetch(`${URL}/newsApi/createReport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userLogInf.token,
      },
      body: JSON.stringify({
        newsId: currentPostDetails._id,
        cause,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setArticleOptions(false);
        setReportResponseStatus(true);
        setReportResponseText(res.message);
      })
      .catch((e) => e);
  };

  return (
    <ViewBackground>
      {userLogInf ? (
        <>
          <ScrollView
            style={checkTheme ? styles.contentLight : styles.contentDark}
          >
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
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
                {/* Article options */}
                <View>
                  <View>
                    <TouchableOpacity
                      style={styles.optionsCircle}
                      onPress={() => setArticleOptions(!articleOptions)}
                    >
                      <View style={styles.optionsDot} />
                      <View style={styles.optionsDot} />
                      <View style={styles.optionsDot} />
                    </TouchableOpacity>
                    {reportResponseStatus ? (
                      <AwesomeAlert
                        show={reportResponseStatus}
                        showProgress={false}
                        message={`${reportResponseText}`}
                        showConfirmButton
                        closeOnHardwareBackPress={false}
                        closeOnTouchOutside={false}
                        confirmText="Got It"
                        confirmButtonColor="#1890ff"
                        onConfirmPressed={() => {
                          setReportResponseStatus(false);
                        }}
                        contentContainerStyle={
                          checkTheme
                            ? { backgroundColor: 'whitesmoke' }
                            : { backgroundColor: 'white' }
                        }
                        messageStyle={{ fontWeight: 'bold' }}
                      />
                    ) : null}
                  </View>
                  {articleOptions ? (
                    <View
                      style={
                        checkTheme
                          ? styles.optionsMainDropdownHolderLight
                          : styles.optionsMainDropdownHolderDark
                      }
                    >
                      <View style={styles.optionsDropdown}>
                        <Icon name="bell-alert" size={20} color="gray" />
                        <TouchableOpacity
                          onPress={() => createArticleReport('report article')}
                        >
                          <Text style={styles.reportText}>Report Article</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.optionsDropdown}>
                        <Icon name="bell-alert" size={20} color="gray" />
                        <TouchableOpacity
                          onPress={() => createArticleReport('report photo')}
                        >
                          <Text style={styles.reportText}>Report Photo</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.optionsDropdown}>
                        <Icon name="bell-alert" size={20} color="gray" />
                        <TouchableOpacity>
                          <Text style={styles.reportText}>
                            Photo credit request
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.optionsDropdown}>
                        <Icon name="link-variant" size={20} color="gray" />
                        <TouchableOpacity onPress={() => createArticleReport()}>
                          <Text style={styles.reportText}>Plagiarized</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.optionsDropdown}>
                        <Icon name="download" size={20} color="gray" />
                        <TouchableOpacity
                          onPress={() => {
                            insertArticleIntoSavedArticlesTable(
                              !userLogInf._id
                                ? userLogInf.userId
                                : userLogInf._id,
                              currentPostDetails,
                            );
                            setDownloadFeedbackStatus(true);
                          }}
                        >
                          <Text style={styles.reportText}>Save Article</Text>
                        </TouchableOpacity>
                      </View>
                      {downloadFeedback ? (
                        <AwesomeAlert
                          show={downloadFeedback}
                          showProgress={false}
                          message="Succesfully saved article for offline reading"
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
                    </View>
                  ) : null}
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
              {offlineMode ? (
                <Text
                  style={
                    checkTheme
                      ? styles.offlineTextLight
                      : styles.offlineTextDark
                  }
                >
                  Please connect to the network
                </Text>
              ) : (
                <CommentInput
                  setComment={setComment}
                  addNewComment={addNewComment}
                  checkTheme={checkTheme}
                />
              )}
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
                        !userLogInf._id ? userLogInf.userId : userLogInf._id
                      }
                      token={userLogInf.token}
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
        </>
      ) : null}
      <Footer navigation={navigation} />
    </ViewBackground>
  );
};

export default CurrentPostScreenOnline;
