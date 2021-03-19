import React from 'react';

import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import * as actions from '../../redux/videos/actions';

import styles from './styles';

const VideoComponent = ({ videoInfo }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          dispatch(actions.setCurrentVideoPlayer(true));
          dispatch(actions.setCurrentVideo(videoInfo));
        }}
      >
        <Image
          source={{ uri: `${videoInfo.thumbnail}` }}
          style={styles.cardImage}
        />
      </TouchableOpacity>
      <View style={styles.block}>
        <Text>{videoInfo.title}</Text>
      </View>
    </View>
  );
};

export default VideoComponent;
