import React from 'react';
import {
  TextInput, View, TouchableOpacity, Text, Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const CommentInput = ({ checkTheme, setComment, addNewComment }) => {
  const userLogInf = useSelector((state) => state.user.userInfo);
  const { avatar } = userLogInf;
  return (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        {!avatar ? (
          <Image
            source={require('../../images/defaultAvatar.png')}
            style={styles.avatar}
          />
        ) : (
          <Image source={{ uri: `${avatar}` }} style={styles.avatar} />
        )}
      </View>
      <View
        style={
          checkTheme ? styles.inputContainerLight : styles.inputContainerDark
        }
      >
        <TextInput
          placeholder="Enter Comment"
          placeholderTextColor="gray"
          onChangeText={(text) => setComment(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => addNewComment()}
      >
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;
