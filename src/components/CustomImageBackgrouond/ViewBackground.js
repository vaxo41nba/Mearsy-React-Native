import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';

const ViewImageBackground = ({ children, style }) => {
  const checkTheme = useSelector((state) => state.user.lightTheme);
  return (
    <>
      {checkTheme ? (
        <View style={[style, styles.container]}>
          <Image
            source={require('../../images/background.png')}
            style={styles.imageBackground}
          />
          {children}
        </View>
      ) : (
        <View style={[style, styles.darkTheme]}>{children}</View>
      )}
    </>
  );
};

export default ViewImageBackground;
