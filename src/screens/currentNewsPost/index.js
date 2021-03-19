import React from 'react';

import { useSelector } from 'react-redux';

import CurrentPostScreenOnline from './OfflineOrOnline/UserOnline';
import CurrentPostScreenOffline from './OfflineOrOnline/UserOffline';

const CurrentPostScreen = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.user.loginStatus);
  const userLogInf = useSelector((state) => state.user.userInfo);

  return (
    <>
      {isLoggedIn && userLogInf ? (
        <CurrentPostScreenOnline navigation={navigation} />
      ) : (
        <CurrentPostScreenOffline navigation={navigation} />
      )}
    </>
  );
};

export default CurrentPostScreen;
