import React, { useState } from 'react';

import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';

import { useDispatch } from 'react-redux';
import * as userActions from '../../redux/user/actions';

import CommentFooter from '../CommentFooter';

import styles from './styles';

const ReplyUI = ({
  i,
  userId,
  removeComment,
  voteForComment,
  addChildComment,
  isLoggedIn,
  sendCommentReport,
  checkTheme,
  navigation,
}) => {
  const dispatch = useDispatch();

  const [reply, startReply] = useState(false);

  const formatDate = new Date(i.createdAt);

  return (
    <View style={styles.replyMainContentHolder}>
      <View style={styles.replyMainContent}>
        {!i.header.avatar ? (
          <View style={styles.avatarCircle}>
            <TouchableOpacity
              onPress={() => {
                dispatch(userActions.getChosenUserInfo({ userId: i.id }));
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
            <Image source={{ uri: `${i.header.avatar}` }} style={styles.avatar} />
          </View>
        )}
        <View>
          <View style={styles.personalInfoContainer}>
            <Text
              style={
                checkTheme
                  ? styles.userNameSurnameLight
                  : styles.userNameSurnameDark
              }
            >
              {i.header.name}
            </Text>
            <Text
              style={
                checkTheme
                  ? styles.userNameSurnameLight
                  : styles.userNameSurnameDark
              }
            >
              {i.header.surname}
            </Text>
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
          {i.messageBody}
        </Text>
        <>
          <CommentFooter
            reply={reply}
            startReply={startReply}
            info={i}
            userId={userId}
            commentId={i.id}
            checkTheme={checkTheme}
            isLoggedIn={isLoggedIn}
            addChildComment={addChildComment}
            removeComment={removeComment}
            sendCommentReport={sendCommentReport}
            voteForComment={voteForComment}
          />
        </>
      </View>
    </View>
  );
};

export default ReplyUI;
