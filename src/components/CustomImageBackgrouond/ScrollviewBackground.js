import React from 'react';
import { Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';

const ScrollViewImageBackground = ({ children, style }) => {
  const checkTheme = useSelector((state) => state.user.lightTheme);

  return (
    <>
      {checkTheme ? (
        <>
          <ScrollView style={[style, styles.container]}>
            <Image
              source={require('../../images/background.png')}
              style={styles.imageBackgroundScrollView}
            />
            {children}
          </ScrollView>
        </>
      ) : (
        <ScrollView style={[style, styles.darkTheme]}>{children}</ScrollView>
      )}
    </>
  );
};

export default ScrollViewImageBackground;
