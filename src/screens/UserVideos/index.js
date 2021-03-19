import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import Footer from '../../components/Footer';
import VideoComponent from '../../components/VideoComp';
import CurrentVideo from '../../components/VideoComp/CurrentVideo';
import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import GeneralSettings from '../../components/UserGeneralSettings';

import styles from './styles';

const UserVideosScreen = ({ navigation }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const loggedUser = useSelector((state) => state.user.userInfo);
  const player = useSelector((state) => state.videos.watchVideo);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  const [userVideos, setUserVideos] = useState(null);

  useEffect(() => {
    fetch(`${URL}/videoApi/getAllVideos`, {})
      .then((res) => res.json())
      .then((res) => {
        const findUserVideos = res.filter(
          (video) => video.authorId === loggedUser._id,
        );
        setUserVideos(findUserVideos);
      })
      .catch((e) => e);
  }, []);

  return userVideos ? (
    <>
      <ViewBackground>
        <View style={styles.generalSettingsContainer}>
          <GeneralSettings navigation={navigation} />
        </View>
        <Text style={checkTheme ? styles.titleTextLight : styles.titleTextDark}>
          Videos
        </Text>
        <View style={styles.bottomBorder} />
        <ScrollView>
          {player ? (
            <View>
              <CurrentVideo />
            </View>
          ) : (
            <View>
              <>
                <View>
                  <ScrollView>
                    {userVideos.map((i) => (
                      <View key={i._id}>
                        <VideoComponent videoInfo={i} />
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </>
            </View>
          )}
        </ScrollView>
        {player ? null : <Footer navigation={navigation} />}
      </ViewBackground>
    </>
  ) : null;
};

export default UserVideosScreen;
