import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import * as questionActions from '../../redux/questions/actions';
import * as userActions from '../../redux/user/actions';

import styles from './styles';

const PopQuestion = ({ info, navigation, checkTheme }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;
  const { name, surname, avatar } = info.header;
  const {
    createdAt, messageBody, upvoteQuantity, id,
  } = info.question;

  const formatDate = new Date(createdAt);

  const dispatch = useDispatch();

  const userLogInf = useSelector((state) => state.user.userInfo);

  const [loading, startLoading] = useState(false);
  const [upVote, userUpVote] = useState(false);
  const [downVote, userDownVote] = useState(false);

  const voteForQuestion = (value) => {
    startLoading(true);
    fetch(`${URL}/questionsApi/voteToQuestion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userLogInf.token,
      },
      body: JSON.stringify({
        questionId: id,
        voteValue: value,
        userId: userLogInf._id,
      }),
    })
      .then(() => {
        startLoading(false);
        if (value === 1) {
          userUpVote(true);
          userDownVote(false);
        } else {
          userDownVote(true);
          userUpVote(false);
        }
      })
      .catch((e) => e);
  };

  return (
    <>
      <View style={styles.mainContent}>
        {!avatar ? (
          <View style={styles.avatarCircle}>
            <TouchableOpacity
              onPress={() => {
                dispatch(userActions.getChosenUserInfo(info.header));
                navigation.navigate('ChosenProfile');
              }}
            >
              <Image
                source={require('../../images/defaultAvatar.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.avatarCircle}>
            <TouchableOpacity
              onPress={() => {
                dispatch(userActions.getChosenUserInfo(info.header));
                navigation.navigate('ChosenProfile');
              }}
            >
              <Image source={{ uri: `${avatar}` }} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <View style={styles.personalInfoContainer}>
            <TouchableOpacity
              style={styles.personalInfoContainer}
              onPress={() => {
                dispatch(userActions.getChosenUserInfo(info.header));
                navigation.navigate('ChosenProfile');
              }}
            >
              <Text
                style={
                  checkTheme
                    ? styles.userNameSurnameLight
                    : styles.userNameSurnameDark
                }
              >
                {name}
              </Text>
              <Text
                style={
                  checkTheme
                    ? styles.userNameSurnameLight
                    : styles.userNameSurnameDark
                }
              >
                {surname}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={checkTheme ? styles.dateTextLight : styles.dateTextDark}>
            {formatDate.toString().substring(0, 25)}
          </Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CurrentQuestion');
            dispatch(questionActions.setCurrentQuestion(info));
          }}
        >
          <Text
            style={
              checkTheme ? styles.commentTextLight : styles.commentTextDark
            }
          >
            {messageBody}
          </Text>
        </TouchableOpacity>
        <>
          <View style={styles.voteContainer}>
            <TouchableOpacity
              onPress={() => {
                upVote ? null : voteForQuestion(1);
              }}
              style={styles.buttonItemsContainer}
            >
              <Image
                source={require('../../images/straight-arrow-.png')}
                style={styles.upvoteImage}
              />
              <Text style={upVote ? styles.disabledVoteText : styles.voteText}>
                Upvote
              </Text>
            </TouchableOpacity>
            <Text
              style={
                upvoteQuantity < 0
                  ? styles.quantityNegativeText
                  : styles.quantityPositiveText
              }
            >
              {loading ? (
                <ActivityIndicator size="small" color="#1890ff" />
              ) : (
                upvoteQuantity
              )}
            </Text>
            <TouchableOpacity
              onPress={() => {
                downVote ? null : voteForQuestion(-1);
              }}
              style={styles.buttonItemsContainer}
            >
              <Image
                source={require('../../images/straight-arrow-.png')}
                style={styles.downVoteImage}
              />
              <Text
                style={downVote ? styles.disabledVoteText : styles.voteText}
              >
                Downvote
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </>
  );
};

export default PopQuestion;
