import React, { useState, useEffect } from 'react';
import {
  ScrollView, Text, View, Image, TouchableOpacity,
} from 'react-native';

import { useSelector } from 'react-redux';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import Footer from '../../components/Footer';
import CommentInput from '../../components/InputForComments';

// import * as userActions from '../../redux/user/actions';

import styles from './styles';

const CurrentQuestionScreen = ({ navigation }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;
  // const dispatch = useDispatch();
  const checkTheme = useSelector((state) => state.user.lightTheme);
  const questionInfo = useSelector((state) => state.questions.currentQuestion);
  const {
    createdAt, messageBody, upvoteQuantity, id,
  } = questionInfo.question;

  const userLogInf = useSelector((state) => state.user.userInfo);
  const { _id, token } = userLogInf;

  const { name, surname, avatar } = questionInfo.header;
  const [upVote, userUpVote] = useState(false);
  const [downVote, userDownVote] = useState(false);
  const [upVoteComment, setUpVoteComment] = useState(false);
  const formatDate = new Date(createdAt);
  const [answers, setAnswers] = useState([]);
  const voteForQuestion = (value) => {
    fetch(`${URL}/questionsApi/voteToQuestion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        questionId: id,
        voteValue: value,
        userId: _id,
      }),
    })
      .then(() => {
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

  useEffect(() => {
    if (_id && id) {
      fetch(
        `${URL}/questionsApi/getAnswersOnMainQuestion?mainQuestionId=${id}&userId=${_id}`,
      )
        .then((res) => res.json())
        .then((res) => {
          setAnswers(res);
          setUpVoteComment(upVoteComment);
        })
        .catch((e) => e);
    }
  }, []);

  return (
    <ViewBackground>
      <ScrollView
        style={
          checkTheme
            ? styles.backgroundContainerLight
            : styles.backgroundContainerDark
        }
      >
        <View style={checkTheme ? styles.containerDark : styles.containerLight}>
          <View style={styles.titleContainer}>
            <Text
              style={checkTheme ? styles.titleTextLight : styles.titleTextDark}
            >
              Question
            </Text>
          </View>
          {/* User Info */}
          <View style={styles.userInfContainer}>
            {!avatar ? (
              <View style={styles.circle}>
                <TouchableOpacity
                  onPress={() => {
                    // dispatch(userActions.getChosenUserInfo(info.header));
                    navigation.navigate('Home');
                  }}
                >
                  <Image
                    source={require('../../images/defaultAvatar.png')}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.circle}>
                <TouchableOpacity
                  onPress={() => {
                    // dispatch(userActions.getChosenUserInfo(info.header));
                    // navigation.navigate('ChosenProfile');
                  }}
                >
                  <Image source={{ uri: `${avatar}` }} style={styles.avatar} />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.userDetailedInfo}>
              <Text
                style={
                  checkTheme
                    ? styles.userInfoTextDark
                    : styles.userInfoTextLight
                }
              >
                {name}
              </Text>
              <Text
                style={
                  checkTheme
                    ? styles.userInfoTextDark
                    : styles.userInfoTextLight
                }
              >
                {surname}
              </Text>
              <Text
                style={checkTheme ? styles.dateTextLight : styles.dateTextDark}
              >
                {formatDate.toString().substring(0, 25)}
              </Text>
            </View>
          </View>
          {/* Message */}
          <View style={styles.messageBodyContainer}>
            <Text
              style={
                checkTheme
                  ? styles.messageBodyTextLight
                  : styles.messageBodyTextDark
              }
            >
              {messageBody}
            </Text>
            {/* Message Actions */}
            <View style={styles.messageActionsContainer}>
              <TouchableOpacity
                style={styles.voteButton}
                onPress={() => {
                  upVote ? null : voteForQuestion(1);
                }}
              >
                <Image
                  style={styles.voteArrowUp}
                  source={require('../../images/straight-arrow-.png')}
                />
                <Text
                  style={upVote ? styles.disabledVoteText : styles.voteText}
                >
                  Upvote
                </Text>
              </TouchableOpacity>
              <Text
                style={
                  upvoteQuantity < 0
                    ? styles.voteQuantityNegative
                    : styles.voteQuantityPositive
                }
              >
                {upvoteQuantity}
              </Text>
              <TouchableOpacity
                style={styles.voteButton}
                onPress={() => {
                  downVote ? null : voteForQuestion(-1);
                }}
              >
                <Image
                  style={styles.voteArrowDown}
                  source={require('../../images/straight-arrow-.png')}
                />
                <Text
                  style={downVote ? styles.disabledVoteText : styles.voteText}
                >
                  Downvote
                </Text>
              </TouchableOpacity>
              {/* Options */}
              <TouchableOpacity style={styles.optionsCircle}>
                <View style={styles.optionsDot} />
                <View style={styles.optionsDot} />
                <View style={styles.optionsDot} />
              </TouchableOpacity>
            </View>
            {/* Add Comment */}
            <CommentInput />
            {/* Comments */}
          </View>
        </View>

        <View style={styles.answersContainer}>
          {!answers
            ? null
            : answers.map((i) => (
              <View style={styles.currentAnswer}>
                <View style={styles.answerHeader}>
                  <Image
                    source={{ uri: `${i.header.avatar}` }}
                    style={styles.avatarComments}
                  />

                  <View style={styles.headerInfo}>
                    <Text key={Math.random()} style={styles.author}>
                      {i.author}
                    </Text>
                    <Text key={Math.random()} style={styles.createdAt}>
                      {i.createdAt}
                    </Text>
                  </View>
                </View>

                <Text key={Math.random()} style={styles.comment}>
                  {i.messageBody}
                </Text>
                <View style={styles.voteContainer}>
                  <TouchableOpacity
                      // onPress={() => {
                      //   reply ? null : reply();
                      // }}
                    style={styles.buttonItemsContainer}
                  >
                    <Image
                      source={require('../../images/reply.png')}
                      style={styles.reply}
                    />
                    <Text
                      style={
                          upVoteComment
                            ? styles.disabledVoteText
                            : styles.voteText
                        }
                    >
                      Reply
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.rightVote}>
                    <TouchableOpacity
                        // onPress={() => {
                        //   upVoteComment ? null : voteForComment(1);
                        // }}
                      style={styles.buttonItemsContainer}
                    >
                      <Image
                        source={require('../../images/straight-arrow-.png')}
                        style={styles.upvoteImage}
                      />
                      <Text
                        style={
                            upVoteComment
                              ? styles.disabledVoteText
                              : styles.voteText
                          }
                      >
                        Upvote
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={() => {
                        //   upVote ? null : voteForComment(-1);
                        // }}
                      style={styles.buttonItemsContainer}
                    >
                      <Image
                        source={require('../../images/straight-arrow-.png')}
                        style={styles.downvoteImage}
                      />
                      <Text
                        style={
                            upVoteComment
                              ? styles.disabledVoteText
                              : styles.voteText
                          }
                      >
                        Upvote
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <Text
                        style={
                          upvoteQuantity < 0
                            ? styles.quantityNegativeText
                            : styles.quantityPositiveText
                        }>
                        {loading ? (
                          <ActivityIndicator size="small" color="#1890ff" />
                        ) : (
                          upvoteQuantity
                        )}
                      </Text> */}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </ViewBackground>
  );
};

export default CurrentQuestionScreen;
