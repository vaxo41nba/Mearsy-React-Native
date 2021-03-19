import React, { useState, useEffect } from 'react';

import { ScrollView, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NEXT_PUBLIC_ADMIN_URL } from '@env'; // eslint-disable-line import/no-unresolved
import TrackPlayer from 'react-native-track-player';

import * as userActions from '../../redux/user/actions';
import * as audioActions from '../../redux/audios/actions';

import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import Footer from '../../components/Footer';
import AudioCard from '../../components/AudioCard';

import styles from './styles';

import {
  insertIntoPodcastTable,
  getPodcastTableRows,
} from '../../../OfflineDatabase';

const AudioPlayer = ({ navigation }) => {
  const ADMIN_URL = NEXT_PUBLIC_ADMIN_URL;
  const dispatch = useDispatch();

  const userInf = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  const currentAudio = useSelector((state) => state.audio.chosenAudio);
  const queList = useSelector((state) => state.audio.queList);

  const [podcastList, setPodcatList] = useState([]);

  // -----> Creates list of podcasts and then adds this array to the TrackPlayer podcast que <-----
  useEffect(() => {
    const queListArr = [];
    fetch(`${ADMIN_URL}/podcastApi/getAllPodcasts`)
      .then((res) => res.json())
      .then((res) => {
        setPodcatList(res);
        res.map((audio) => {
          insertIntoPodcastTable(audio);
          queListArr.push({
            id: audio._id,
            url: `https://ipfs.io/ipfs/${audio.link}`,
            title: audio.title,
            artist: audio.author,
            artwork: audio.thumbnail,
          });
        });
        dispatch(audioActions.setQueList(queListArr));
      })
      .catch(() => {
        getPodcastTableRows(dispatch);
      });
  }, []);

  useEffect(() => {}, [currentAudio]);

  useEffect(() => {
    AsyncStorage.getItem('@userData').then((data) => {
      dispatch(userActions.getUserInfo(JSON.parse(data)));
    });
  }, []);

  useEffect(() => {
    !queList
      ? null
      : TrackPlayer.setupPlayer().then(async () => {
        await TrackPlayer.add(queList);
      });
  }, [queList]);

  return (
    <>
      <ViewBackground>
        <View style={checkTheme ? styles.containerLight : styles.containerDark}>
          <Text style={checkTheme ? styles.titleLight : styles.titleDark}>
            Podcasts
          </Text>
          <View style={checkTheme ? styles.lineLight : styles.lineDark} />

          {/* Playlist */}
          <ScrollView showsVerticalScrollIndsicator={false}>
            {podcastList.map((audio) => (
              <View key={audio._id} style={styles.audioContainer}>
                <AudioCard
                  navigation={navigation}
                  thumbnail={audio.thumbnail}
                  author={audio.author}
                  title={audio.title}
                  userInf={userInf}
                  checkTheme={checkTheme}
                  _id={audio._id}
                  podcastList={podcastList}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ViewBackground>
      <Footer navigation={navigation} />
    </>
  );
};

export default AudioPlayer;
