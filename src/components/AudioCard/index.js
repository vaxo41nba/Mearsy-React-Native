import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import TrackPlayer from 'react-native-track-player';

import { useDispatch } from 'react-redux';

import * as audioActions from '../../redux/audios/actions';

import styles from './styles';

const AudioCard = ({
  thumbnail,
  author,
  _id,
  title,
  userInf,
  checkTheme,
  navigation,
}) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const dispatch = useDispatch();

  const [likedStatus, setLikedStatus] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [likedPodcastsList, setLikedPodcastList] = useState([]);

  // useEffect(() => {
  //   userInf.likedPodcasts.map((i) =>
  //     setLikedPodcastList([
  //       ...likedPodcastsList,
  //       {
  //         liked: true,
  //         id: i,
  //       },
  //     ]),
  //   );
  // }, []);

  const updateUserLikedList = () =>
    // const onlyIdsinLikedPodasts = likedPodcastsList.map((i) => i.id);
    fetch(`${URL}/userApi/getUserInfoById`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field: 'likedPodcasts', userId: userInf._id }),
    }).then(() => {
      fetch(`${URL}/userApi/updateUserInfoById`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          field: [{ likedPodcasts: likedPodcastsList }],
          userId: userInf._id,
        }),
      }).then(() => setLikedStatus(!likedStatus));
    });
  const likePodcastHandler = (podcastId) => {
    const findDuplicate = likedPodcastsList.filter((i) => i === podcastId);
    if (findDuplicate.length > 0) {
      const removeLikedPodcast = likedPodcastsList.filter(
        (i) => i !== podcastId,
      );
      setLikedPodcastList(removeLikedPodcast);
      updateUserLikedList();
    } else {
      setLikedPodcastList([...likedPodcastsList, podcastId]);
      updateUserLikedList();
    }
  };

  const podcastHandler = async () => {
    if (isPlaying) {
      TrackPlayer.pause();
      setisPlaying(false);
      dispatch(audioActions.setCurrentAudio(null));
    } else {
      TrackPlayer.play();
      // TODO: Find solution to this
      TrackPlayer.skip(_id);
      navigation.navigate('ChosenAudio');
      dispatch(
        audioActions.setCurrentAudio({
          title,
          thumbnail,
          author,
          id: _id,
        }),
      );
    }
  };

  return (
    <View style={styles.audioContainer}>
      {isPlaying ? (
        <Icon
          onPress={() => {
            // setTimeout(function afterTwoSeconds() {
            //   dispatch(audioActions.setPlaying(null));
            // }, 1000);
            podcastHandler();
          }}
          name="pause"
          size={25}
          color={checkTheme ? 'black' : 'white'}
        />
      ) : (
        <Icon
          onPress={() => {
            // setTimeout(function afterTwoSeconds() {
            //   dispatch(audioActions.setPlaying(data));
            // }, 1000);
            podcastHandler();
          }}
          onPressIn
          name="play-arrow"
          size={25}
          color={checkTheme ? 'black' : 'white'}
        />
      )}
      <Image source={{ uri: `${thumbnail}` }} style={styles.audioThumb} />
      <View style={styles.authorTitle}>
        <Text style={checkTheme ? styles.authorLight : styles.authorDark}>
          {author}
        </Text>
        <Text style={checkTheme ? null : styles.titleLeDark}>{title}</Text>
      </View>
      {likedStatus ? (
        <Icon
          onPress={() => {
            likePodcastHandler(_id);
          }}
          name="favorite"
          size={20}
          color="red"
        />
      ) : (
        <Icon
          onPress={() => {
            likePodcastHandler(_id);
          }}
          name="favorite-border"
          size={20}
          color={checkTheme ? 'gray' : 'white'}
        />
      )}
    </View>
  );
};

export default AudioCard;
