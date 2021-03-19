import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import WebView from 'react-native-webview';

import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles';
import * as actions from '../../../redux/videos/actions';

const CurrentVideo = () => {
  const dispatch = useDispatch();
  const videoInfo = useSelector((state) => state.videos.currentVideo);
  const currVideo = videoInfo.link.split('watch?v=');

  return (
    <View style={styles.currentVideoMainHolder}>
      <View style={styles.titleContainer}>
        <View style={styles.currentVideoTitleAndButton}>
          <Text style={styles.currentVideoTitleText}>{videoInfo.title}</Text>
          <TouchableOpacity
            style={styles.videoXbutton}
            onPress={() => dispatch(actions.setCurrentVideoPlayer(false))}
          >
            <Text style={styles.videoXbuttonText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.borderBottomForCurVideo} />
      </View>
      <View style={styles.currentVideoContainer}>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${currVideo[1]}` }}
          style={styles.videPlayerStyle}
        />
      </View>
    </View>
  );
};

export default CurrentVideo;
