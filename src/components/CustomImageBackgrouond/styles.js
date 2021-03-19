import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    zIndex: -2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'repeat',
    height: '100%',
  },
  imageBackgroundScrollView: {
    height: '100%',
    zIndex: -2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'repeat',
  },
  darkTheme: {
    backgroundColor: '#1B1B1B',
    flex: 1,
  },
});
