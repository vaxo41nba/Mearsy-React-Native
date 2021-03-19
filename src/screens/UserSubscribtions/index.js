import React from 'react';
import { View, ScrollView, Text } from 'react-native';

import { useSelector } from 'react-redux';

import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import SubscriptionsAccount from '../../components/Subscriptions';
import Footer from '../../components/Footer';
import GeneralSettings from '../../components/UserGeneralSettings';

import styles from './styles';

const UserSubscriptionsScreen = ({ navigation }) => {
  const subscriptions = useSelector((state) => state.user.userReaders);
  const loggedUserInfo = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  return (
    <>
      <ViewBackground>
        <View style={styles.generalSettingsContainer}>
          <GeneralSettings navigation={navigation} />
        </View>

        <View style={checkTheme ? styles.containerLight : styles.containerDark}>
          {subscriptions.length === 0 ? (
            <View style={styles.noSubscriptionTextContainer}>
              <Text
                style={
                  checkTheme
                    ? styles.noSubscriptionsTextLight
                    : styles.noSubscriptionsTextDark
                }
              >
                You have no subscriptions yet
              </Text>
            </View>
          ) : (
            <ScrollView>
              {subscriptions.map((user) => (
                <View style={styles.subscriptionsMainContent} key={user.userId}>
                  <SubscriptionsAccount
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

export default UserSubscriptionsScreen;
