import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
  },
  errorText: {
    fontWeight: '400',
    fontSize: 50,
    alignSelf: 'center',
    color: 'red',
    bottom: '40%',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textAndIconContainer: {
    // flexDirection: 'row',
    alignSelf: 'center',
  },
  errorIcon: {
    bottom: '50%',
    alignSelf: 'center',
  },
});

export default styles;
