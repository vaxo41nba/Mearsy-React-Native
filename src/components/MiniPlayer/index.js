import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import TrackPlayer from 'react-native-track-player';

import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as audioActions from '../../redux/audios/actions';

import styles from './styles';

const MiniPlayer = () => {
  const dispatch = useDispatch();

  const [phase, setPhase] = useState(false);
  const [playing, setPlayingStatus] = useState(true);

  const queList = useSelector((state) => state.audio.queList);
  const currentAudio = useSelector((state) => state.audio.chosenAudio);

  const moveToNextPodcast = () => {
    TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      if (data.nextTrack) {
        const futurePodcastInQue = queList.filter(
          (i) => i.id === data.nextTrack,
        );
        const objectified = { ...futurePodcastInQue };
        dispatch(
          audioActions.setCurrentAudio({
            title: objectified[0].title,
            thumbnail: objectified[0].artwork,
            author: objectified[0].artist,
            id: objectified[0].id,
          }),
        );
        setPhase(!phase);
      }
    });
  };

  useEffect(() => {
    moveToNextPodcast();
  }, [phase]);

  return currentAudio ? (
    <View style={styles.container}>
      <Image
        source={{ uri: `${currentAudio.thumbnail}` }}
        style={styles.imageContainer}
      />
      <View>
        <Text style={styles.infoText}>{currentAudio.title}</Text>
        <Text style={styles.infoText}>{currentAudio.author}</Text>
      </View>
      <View style={styles.mainButtonContainers}>
        <View style={styles.iconsContainer}>
          {playing ? (
            <Icon
              onPress={() => {
                setPlayingStatus(false);
                TrackPlayer.pause();
              }}
              name="pause-circle-filled"
              style={styles.iconPosition}
              size={40}
              color="#ff4d4f"
            />
          ) : (
            <Icon
              onPress={() => {
                TrackPlayer.play();
                setPlayingStatus(true);
              }}
              name="play-circle-filled"
              style={styles.iconPosition}
              size={40}
              color="#ff4d4f"
            />
          )}

          <Icon
            name="cancel"
            style={styles.iconPosition}
            size={40}
            color="#ff4d4f"
            onPress={() => {
              TrackPlayer.stop();
              dispatch(audioActions.setCurrentAudio(null));
            }}
          />
        </View>
      </View>
    </View>
  ) : null;
};

export default MiniPlayer;
