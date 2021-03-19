import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

import { useSelector } from 'react-redux';

import Footer from '../../components/Footer';
import ErrorComponent from '../../components/Error';
import VideoComponent from '../../components/VideoComp';
import CurrentVideo from '../../components/VideoComp/CurrentVideo';
import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';

import styles from './styles';

const VideosScreen = ({ navigation }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const [videosList, setVideosList] = useState(null);
  const [error, checkIfError] = useState(null);
  const player = useSelector((state) => state.videos.watchVideo);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  const loadAllVideos = () =>
    fetch(`${URL}/videoApi/getAllVideos`, {})
      .then((res) => res.json())
      .then((res) => {
        setVideosList(res);
      })
      .catch((e) => checkIfError(e));

  useEffect(() => {
    loadAllVideos();
  }, []);

  return videosList ? (
    <>
      <ViewBackground>
        {!error ? (
          <ScrollView>
            {player ? (
              <View>
                <CurrentVideo />
              </View>
            ) : (
              <View>
                <Text
                  style={
                    checkTheme ? styles.titleTextLight : styles.titleTextDark
                  }
                >
                  Videos
                </Text>
                <View
                  style={
                    checkTheme
                      ? styles.bottomBorderLight
                      : styles.bottomBorderDark
                  }
                />
                <View>
                  <ScrollView>
                    {videosList.map((i) => (
                      <View key={i._id}>
                        <VideoComponent videoInfo={i} />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
          </ScrollView>
        ) : (
          <ErrorComponent navigation={navigation} />
        )}

        {player ? null : <Footer navigation={navigation} />}
      </ViewBackground>
    </>
  ) : null;
};

export default VideosScreen;
