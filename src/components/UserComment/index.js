import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/AntDesign';
import CommentFooter from '../CommentFooter';
import ReplyUI from './replyUI';

import styles from './styles';

import * as userActions from '../../redux/user/actions';

const Comment = ({
  info,
  currentPostId,
  isLoggedIn,
  userId,
  commentId,
  getComms,
  token,
  navigation,
  checkTheme,
}) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const [reply, startReply] = useState(false);
  const [checkReplies, setCheckReplies] = useState(false);
  const [options, chooseOptions] = useState(false);
  const [replyList, setReplyList] = useState([]);

  const dispatch = useDispatch();

  const formatDate = new Date(info.createdAt);

  useEffect(() => {
    fetch(`${URL}/commentApi/childComments/${info.id}/${info.authorId}`)
      .then((res) => res.json())
      .then((res) => setReplyList(res))
      .catch((error) => error);
  }, [userId]);

  const addChildComment = (text) => {
    startReply(!reply);

    const comment = {
      parentId: info.id,
      messageBody: text,
      authorId: userId,
      newsId: currentPostId,
      repliedToId: info.id,
    };

    fetch(`${URL}/commentApi/createComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ ...comment }),
    });
  };

  const voteForComment = (value) =>
    fetch(`${URL}/commentApi/changeVoteToComment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        commentId: info.id,
        voteValue: value,
        userId,
      }),
    });

  const removeComment = (id) => {
    chooseOptions(false);
    fetch(`${URL}/commentApi/deleteComment`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({
        commentId: id,
        userId,
      }),
    })
      .then(() => getComms())
      .catch((err) => err);
  };

  const sendCommentReport = () => {
    chooseOptions(false);
    return fetch(`${URL}/commentApi/createReportt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId,
        authorReport: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => err);
  };

  return (
    <>
      <View style={styles.mainContent}>
        {!info.header.avatar ? (
          <View style={styles.avatarCircle}>
            <TouchableOpacity
              onPress={() => {
                dispatch(userActions.getChosenUserInfo({ userId: info.id }));
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
                dispatch(userActions.getChosenUserInfo({ userId: info.id }));
                navigation.navigate('ChosenProfile');
              }}
            >
              <Image
                source={{ uri: `${info.header.avatar}` }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <View style={styles.personalInfoContainer}>
            <TouchableOpacity
              style={styles.personalInfoContainer}
              onPress={() => {
                dispatch(userActions.getChosenUserInfo({ userId: info.id }));
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
                {info.header.name}
              </Text>
              <Text
                style={
                  checkTheme
                    ? styles.userNameSurnameLight
                    : styles.userNameSurnameDark
                }
              >
                {info.header.surname}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={checkTheme ? styles.dateTextLight : styles.dateTextDark}>
            {formatDate.toString().substring(0, 25)}
          </Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <Text
          style={checkTheme ? styles.commentTextLight : styles.commentTextDark}
        >
          {info.messageBody}
        </Text>
        <>
          <CommentFooter
            reply={reply}
            startReply={startReply}
            info={info}
            userId={userId}
            commentId={commentId}
            checkTheme={checkTheme}
            isLoggedIn={isLoggedIn}
            options={options}
            chooseOptions={chooseOptions}
            addChildComment={addChildComment}
            removeComment={removeComment}
            sendCommentReport={sendCommentReport}
          />
        </>
        {replyList.length === 0 ? null : (
          <View style={styles.replyIconsContainer}>
            <TouchableOpacity
              style={styles.replyCircle}
              onPress={() => {
                setCheckReplies(!checkReplies);
              }}
            >
              <Text style={styles.replyCircleText}>+</Text>
            </TouchableOpacity>
            <View style={styles.replyIconsAndText}>
              <Text
                style={
                  checkTheme
                    ? styles.replyLengthTextLight
                    : styles.replyLengthTextDark
                }
              >
                {replyList.length}
              </Text>
              <Icon
                name="message1"
                size={15}
                color={checkTheme ? '#1890ff' : 'white'}
              />
            </View>
          </View>
        )}
        <View style={styles.line} />
      </View>
      {checkReplies
        ? replyList.map((i) => (
          <View key={i.id}>
            <ReplyUI
              checkTheme={checkTheme}
              userId={userId}
              isLoggedIn={isLoggedIn}
              voteForComment={voteForComment}
              removeComment={removeComment}
              addChildComment={addChildComment}
              sendCommentReport={sendCommentReport}
              i={i}
            />
          </View>
        ))
        : null}
    </>
  );
};

export default Comment;
