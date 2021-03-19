import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import * as actions from '../../redux/user/actions';

const Footer = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userInfo);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  return (
    <View
      style={
        checkTheme
          ? styles.footerLogosContainer
          : styles.footerLogosContainerBlack
      }
    >
      <Icon
        onPress={() => {
          navigation.navigate('Videos');
        }}
        name="play-circle-outline"
        size={40}
        color={checkTheme ? '#f43434' : '#1890ff'}
      />
      <Icon
        onPress={() => {
          navigation.navigate('Podcasts');
        }}
        name="headset"
        size={40}
        color={checkTheme ? '#f43434' : '#1890ff'}
      />
      <Icon
        onPress={() => {
          navigation.navigate('Home');
        }}
        name="home"
        size={40}
        color={checkTheme ? '#f43434' : '#1890ff'}
      />
      {userData ? (
        <Icon
          onPress={() => {
            navigation.navigate('UserActivity');
          }}
          name="comment"
          size={40}
          color={checkTheme ? '#f43434' : '#1890ff'}
        />
      ) : null}

      <Icon
        onPress={async () => {
          if (userData) {
            navigation.navigate('PersonalProfile');
          } else {
            dispatch(actions.setLogin(true));
          }
        }}
        name="person"
        size={40}
        color={checkTheme ? '#f43434' : '#1890ff'}
      />
    </View>
  );
};

export default Footer;
