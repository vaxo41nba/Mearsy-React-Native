import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import IOicon from 'react-native-vector-icons/Ionicons';

import AwesomeAlert from 'react-native-awesome-alerts';
import * as actions from '../../redux/news/actions';
import styles from './styles';

import { insertArticleIntoSavedArticlesTable } from '../../../OfflineDatabase';

const NewsCard = ({
  title,
  description,
  thumbnail,
  date,
  id,
  navigation,
  userArticle,
}) => {
  const dispatch = useDispatch();
  const [downloadFeedback, setDownloadFeedback] = useState(false);
  const [importantNews, setImportantNewsStatus] = useState(false); // eslint-disable-line no-unused-vars

  const checkTheme = useSelector((state) => state.user.lightTheme);
  const offlineMode = useSelector((state) => state.user.offlineStatus);
  const userLogInf = useSelector((state) => state.user.userInfo);
  const currentPostDetails = useSelector((state) => state.news.detailedNews);

  const formatDate = new Date(date);

  const readPostHandler = () => {
    dispatch(
      actions.setCurrentNews({
        id,
        title,
        description,
        thumbnail,
        date,
      }),
    );

    navigation.navigate('CurrentPost');
  };

  const saveArticleHandler = () => {
    dispatch(actions.getCurrentPostDetails(id));
    currentPostDetails
      ? insertArticleIntoSavedArticlesTable(
        !userLogInf._id ? userLogInf.userId : userLogInf._id,
        currentPostDetails,
      )
      : null;
    setDownloadFeedback(true);
  };

  const afterDownloadFeedbackResult = () => {
    dispatch(actions.setDetailedNews(null));
    setDownloadFeedback(false);
  };

  useEffect(() => {
    if (userLogInf) {
      if (userArticle) {
        userLogInf.userImportantNews.includes(id)
          ? setImportantNewsStatus(true)
          : null;
      }
    }
  }, []);

  const updateUserImportantNews = (userId, newsId) => {
    fetch(`${URL}/userApi/updateUserImportantNews`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        newsId,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((e) => e);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: `${thumbnail}` }} style={styles.cardImage} />
      <View style={checkTheme ? styles.blockLight : styles.blockDark}>
        <Text style={checkTheme ? styles.cardTitleLight : styles.cardTitleDark}>
          {title}
        </Text>
        <Text style={checkTheme ? styles.cardTextLight : styles.cardTextDark}>
          {description.length > 15
            ? `${description.substring(0, 100)}...`
            : description}
        </Text>
        {!userArticle ? null : (
          <View style={styles.editAndDeleteButtonContainer}>
            {importantNews ? (
              <IOicon
                name="ios-remove-circle"
                onPress={() => updateUserImportantNews()}
                size={25}
                color="#1890ff"
              />
            ) : (
              <IOicon name="add-circle-outline" size={25} color="white" />
            )}

            <Icon
              name="edit"
              size={25}
              color={checkTheme ? '#606060' : 'white'}
              style={{ marginTop: 5 }}
            />
          </View>
        )}

        <View style={styles.dateAndButton}>
          <Text style={checkTheme ? styles.dateTextLight : styles.dateTextDark}>
            {formatDate.toDateString()}
          </Text>
          <View style={styles.downloadAndReadMore}>
            {userLogInf && !offlineMode ? (
              <Icon
                name="download"
                size={25}
                color={checkTheme ? '#1890ff' : 'white'}
                onPress={() => saveArticleHandler()}
              />
            ) : null}

            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => readPostHandler()}
            >
              <Text style={styles.readMoreButtonText}>Read Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        {downloadFeedback ? (
          <AwesomeAlert
            show={downloadFeedback}
            showProgress={false}
            message="Article saved for offline reading"
            showConfirmButton
            closeOnHardwareBackPress={false}
            closeOnTouchOutside={false}
            confirmText="Got It"
            confirmButtonColor="#1890ff"
            onConfirmPressed={() => {
              afterDownloadFeedbackResult();
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
    </View>
  );
};

export default NewsCard;
