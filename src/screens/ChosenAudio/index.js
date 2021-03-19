import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';

import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import AudioInput from '../../components/AudioInput';
import Footer from '../../components/Footer';

import * as audioActions from '../../redux/audios/actions';

import styles from './styles';

const ChosenAudioScreen = ({ navigation }) => {
  const progress = useTrackPlayerProgress();
  const { position, duration } = progress;
  const dispatch = useDispatch();

  const currentAudio = useSelector((state) => state.audio.chosenAudio);
  const queList = useSelector((state) => state.audio.queList);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  const [shuffleStatus, setShuffleStatus] = useState(false);
  const [loopStatus, setLoopStatus] = useState(false);

  const [playing, setPlaying] = useState(true);

  const skipTracklistHandler = (type) => {
    if (type === 'next') {
      const currentTrack = currentAudio.id;
      const index = queList.findIndex((i) => i.id === currentTrack);

      const nextItem = queList[index + 1];
      if (index === queList.length - 1) {
        const firstAudio = queList[0];
        dispatch(
          audioActions.setCurrentAudio({
            title: firstAudio.title,
            thumbnail: firstAudio.artwork,
            author: firstAudio.author,
            id: firstAudio.id,
          }),
        );
        TrackPlayer.skip(firstAudio.id);
      } else {
        dispatch(
          audioActions.setCurrentAudio({
            title: nextItem.title,
            thumbnail: nextItem.artwork,
            author: nextItem.author,
            id: nextItem.id,
          }),
        );

        TrackPlayer.skipToNext();
      }
    } else {
      const currentTrack = currentAudio.id;
      const index = queList.findIndex((i) => i.id === currentTrack);
      const previousItem = queList[index - 1];
      if (index === 0) {
        const lastItemInTheQue = queList[queList.length - 1];
        dispatch(
          audioActions.setCurrentAudio({
            title: lastItemInTheQue.title,
            thumbnail: lastItemInTheQue.artwork,
            author: lastItemInTheQue.author,
            id: lastItemInTheQue.id,
          }),
        );

        TrackPlayer.skip(lastItemInTheQue.id);
      } else {
        dispatch(
          audioActions.setCurrentAudio({
            title: previousItem.title,
            thumbnail: previousItem.artwork,
            author: previousItem.author,
            id: previousItem.id,
          }),
        );

        TrackPlayer.skipToPrevious();
      }
    }
  };

  const podcastHandler = (type, value) => {
    if (type === 'next') {
      skipTracklistHandler('next');
    } else if (type === 'previous') {
      skipTracklistHandler('previous');
    } else if (type === 'time') {
      TrackPlayer.seekTo(value);
    } else if (type === 'pause') {
      setPlaying(false);
      TrackPlayer.pause();
    } else if (type === 'play') {
      TrackPlayer.play();
      setPlaying(true);
    }
  };

  const shufflePodcastQueList = () => {
    const randomIndex = Math.floor(Math.random() * Math.floor(queList.length));
    const randomPodcast = queList[randomIndex];
    if (Math.floor(position) === Math.floor(duration)) {
      dispatch(
        audioActions.setCurrentAudio({
          title: randomPodcast.title,
          thumbnail: randomPodcast.thumbnail,
          author: randomPodcast.author,
          id: randomPodcast.id,
        }),
      );
      TrackPlayer.skip(randomPodcast.id);
    } else {
      null;
    }
  };

  const normalPodcastQueList = async () => {
    const getTrack = await TrackPlayer.getCurrentTrack().then((data) => data);
    const currentPodcastInQue = queList.filter((i) => i.id === getTrack);
    const objectified = { ...currentPodcastInQue };
    if (Math.floor(position) === Math.floor(duration)) {
      dispatch(
        audioActions.setCurrentAudio({
          title: objectified[0].title,
          thumbnail: objectified[0].artwork,
          author: objectified[0].artist,
          id: objectified[0].id,
        }),
      );
    }
  };

  const loopPodcastQue = () => {
    Math.floor(position) === Math.floor(duration)
      ? TrackPlayer.skipToPrevious()
      : null;
  };

  useEffect(() => {
    loopStatus ? loopPodcastQue() : null;
    shuffleStatus ? shufflePodcastQueList() : null;
    !loopStatus && !shuffleStatus ? normalPodcastQueList() : null;
  }, [loopStatus, shuffleStatus, position]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <ViewBackground style={styles.mainContainer}>
        {currentAudio ? (
          <View style={checkTheme ? styles.container : styles.containerDark}>
            <AntIcon
              name="closecircle"
              color={checkTheme ? '#f43434' : '#1890ff'}
              size={30}
              style={styles.closeButton}
              onPress={() => {
                dispatch(audioActions.setCurrentAudio(null));
                navigation.navigate('Podcasts');
                TrackPlayer.stop();
              }}
            />

            {/* Thumbnail Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `${currentAudio.thumbnail}` }}
                style={styles.audioThumbLittle}
              />
            </View>
            {/* General information */}
            <View>
              <Text
                style={
                  checkTheme ? styles.titlePlaying : styles.titlePlayingDark
                }
              >
                {currentAudio.title}
              </Text>
              <Text style={checkTheme ? styles.author : styles.authorDark}>
                {currentAudio.author}
              </Text>
            </View>
            {/* Progress Slider */}
            <View>
              <Slider
                style={{ width: '80%', alignSelf: 'center' }}
                onSlidingComplete={(value) => podcastHandler('time', value)}
                value={position}
                maximumValue={duration}
              />
              {/* Time progress */}
              <View style={styles.timeContainer}>
                <Text
                  style={checkTheme ? styles.timeText : styles.timeTextDark}
                >
                  {formatTime(position)}
                </Text>
                <Text
                  style={checkTheme ? styles.timeText : styles.timeTextDark}
                >
                  {formatTime(duration)}
                </Text>
              </View>
            </View>
            {/* Controls */}
            <View style={styles.controls}>
              <Icon
                name="shuffle"
                size={30}
                color={shuffleStatus ? '#ff4d4f' : 'gray'}
                style={styles.control}
                onPress={() => {
                  loopStatus
                    ? setShuffleStatus(false)
                    : setShuffleStatus(!shuffleStatus);
                }}
              />
              <Icon
                name="skip-previous"
                size={30}
                color={checkTheme ? 'black' : 'white'}
                style={styles.control}
                onPress={() => (loopStatus ? null : podcastHandler('previous'))}
              />
              <View style={styles.playPauseContainer}>
                {playing ? (
                  <Icon
                    onPress={() => {
                      podcastHandler('pause');
                    }}
                    name="pause-circle-filled"
                    size={60}
                    color={checkTheme ? '#f43434' : '#1890ff'}
                    style={styles.pauseCircle}
                  />
                ) : (
                  <Icon
                    name="play-circle-filled"
                    size={60}
                    color={checkTheme ? '#f43434' : '#1890ff'}
                    style={styles.pauseCircle}
                    onPress={() => {
                      podcastHandler('play');
                    }}
                  />
                )}
              </View>

              <Icon
                name="skip-next"
                size={30}
                color={checkTheme ? 'black' : 'white'}
                style={styles.control}
                onPress={() => (loopStatus ? null : podcastHandler('next'))}
              />

              <Icon
                name="all-inclusive"
                size={30}
                color={loopStatus ? '#ff4d4f' : 'gray'}
                onPress={() => {
                  setLoopStatus(!loopStatus);
                }}
                style={styles.control}
              />
            </View>
            {/* Comments Section */}
            <View>
              {/* TODO: Create input component and implement getComments route  */}
              <AudioInput />
            </View>
          </View>
        ) : null}
      </ViewBackground>
      <Footer navigation={navigation} />
    </>
  );
};

export default ChosenAudioScreen;
