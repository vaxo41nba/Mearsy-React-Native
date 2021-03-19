import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, TextInput,
} from 'react-native';

import styles from './styles';

const CommentFooter = ({
  isLoggedIn,
  checkTheme,
  info,
  userId,
  reply,
  startReply,
  addChildComment,
  removeComment,
  sendCommentReport,
  commentId,
  voteForComment,
}) => {
  const [replyText, setReplyText] = useState(null);
  const [options, chooseOptions] = useState(false);

  return (
    <View style={styles.replyMainContainer}>
      {!isLoggedIn ? null : (
        <>
          <TouchableOpacity
            style={styles.replyContainer}
            onPress={() => {
              isLoggedIn === 400 || !isLoggedIn ? null : startReply(!reply);
            }}
          >
            <Image
              source={require('../../images/reply.png')}
              style={styles.logoStyle}
            />
            {reply ? (
              <Text
                style={
                  checkTheme ? styles.replyTextLight : styles.replyTextDark
                }
              >
                Cancel
              </Text>
            ) : (
              <Text
                style={
                  checkTheme ? styles.replyTextLight : styles.replyTextDark
                }
              >
                Reply
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {reply ? (
        <View style={styles.replyInputContainer}>
          <TextInput
            placeholder="Write Comment"
            placeholderTextColor="gray"
            style={styles.replyInput}
            onChangeText={(text) => setReplyText(text)}
          />
          <TouchableOpacity
            style={styles.replyAddButton}
            onPress={() => (!replyText ? null : addChildComment(replyText))}
          >
            <Text style={styles.replyAddButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.voteContainer}>
          {options ? (
            <View style={styles.optionsContainer}>
              {userId === info.authorId ? (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => removeComment(commentId)}
                >
                  <Text style={styles.optionText}>Delete Comment</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => sendCommentReport()}
                >
                  <Text style={styles.optionText}>Report Comment</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.voteButton}
                onPress={() => voteForComment(1)}
              >
                <Image
                  style={styles.voteArrowUp}
                  source={require('../../images/straight-arrow-.png')}
                />
                <Text
                  style={
                    checkTheme ? styles.voteTextLight : styles.voteTextDark
                  }
                >
                  Upvote
                </Text>
              </TouchableOpacity>
              <Text
                style={
                  info.upvoteQuantity < 0
                    ? styles.quantityTextNegative
                    : styles.quantityTextPositive
                }
              >
                {info.upvoteQuantity}
              </Text>
              <TouchableOpacity
                style={styles.voteButton}
                onPress={() => voteForComment(-1)}
              >
                <Image
                  style={styles.voteArrowDown}
                  source={require('../../images/straight-arrow-.png')}
                />
                <Text
                  style={
                    checkTheme ? styles.voteTextLight : styles.voteTextDark
                  }
                >
                  Downvote
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={styles.optionsCircle}
            onPress={() => chooseOptions(!options)}
          >
            <View style={styles.optionsDot} />
            <View style={styles.optionsDot} />
            <View style={styles.optionsDot} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CommentFooter;
