import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import * as userActions from '../../redux/user/actions';

import styles from './styles';

const SubscriptionAccount = ({
  user, loggedUserInfo, navigation, blacklist,
}) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;
  const dispatch = useDispatch();

  const [subscribeStatus, setSubscribeStatus] = useState(false);

  const subscribeOnUser = (followerId, readerId, action) =>
    fetch(`${URL}/freadersApi/${action}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        followerId,
        readerId,
      }),
    })
      .then(() => {
        setSubscribeStatus(!subscribeStatus);
      })
      .catch((e) => e);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity
          style={styles.subscriptionButton}
          onPress={() => {
            dispatch(userActions.getChosenUserInfo(user));
            navigation.navigate('ChosenProfile');
          }}
        >
          <View style={styles.subscriptionAvatarHolder}>
            {user.avatar === '' ? (
              <Image
                source={require('../../images/defaultAvatar.png')}
                style={styles.subscriptionsAvatar}
              />
            ) : (
              <Image
                source={{ uri: `${user.avatar}` }}
                style={styles.subscriptionsAvatar}
              />
            )}
          </View>
          <View style={styles.subscriptionNameSurnameHolder}>
            <Text style={styles.subscriptionText}>{user.name}</Text>
            <Text style={styles.subscriptionText}>{user.surname}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        {subscribeStatus ? (
          <TouchableOpacity
            onPress={() =>
              subscribeOnUser(loggedUserInfo._id, user.userId, 'subscribeUser')}
            style={styles.subscribeButton}
          >
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              subscribeOnUser(
                loggedUserInfo._id,
                user.userId,
                'unsubscribeUser',
              )}
            style={styles.unsubscribeButton}
          >
            <Text style={styles.unsubscribeButtonText}>Unsubscribe</Text>
          </TouchableOpacity>
        )}
        {blacklist ? (
          <TouchableOpacity style={styles.blackListButton}>
            <Text style={styles.buttonText}>Add To Blacklist</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default SubscriptionAccount;
