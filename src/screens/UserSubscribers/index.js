import React from 'react';
import { View, ScrollView, Text } from 'react-native';

import { useSelector } from 'react-redux';

import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import SubscribersAccount from '../../components/Subscribers';
import Footer from '../../components/Footer';
import GeneralSettings from '../../components/UserGeneralSettings';

import styles from './styles';

const UserSubscribersScreen = ({ navigation }) => {
  const subscribers = useSelector((state) => state.user.userFollowers);
  const loggedUserInfo = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  return (
    <>
      <ViewBackground>
        <View style={styles.generalSettingsContainer}>
          <GeneralSettings navigation={navigation} />
        </View>

        <View style={checkTheme ? styles.containerLight : styles.containerDark}>
          {subscribers.length === 0 ? (
            <View style={styles.noSubscribersTextContainer}>
              <Text
                style={
                  checkTheme
                    ? styles.noSubscribersTextLight
                    : styles.noSubscribersTextDark
                }
              >
                You have no subscribers yet
              </Text>
            </View>
          ) : (
            <ScrollView>
              {subscribers.map((user) => (
                <View style={styles.subscriptionsMainContent} key={user.userId}>
                  <SubscribersAccount
                    user={user}
                    navigation={navigation}
                    loggedUserInfo={loggedUserInfo}
                    blacklist
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ViewBackground>
      <Footer navigation={navigation} />
    </>
  );
};

export default UserSubscribersScreen;
