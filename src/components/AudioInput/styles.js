import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputContainerLight: {
    width: Dimensions.get('screen').width / 1.5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#1890ff',
    height: Dimensions.get('screen').width / 14,
    paddingLeft: 10,
    paddingTop: 5,
  },
  inputContainerDark: {
    width: Dimensions.get('screen').width / 1.5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#1890ff',
    height: Dimensions.get('screen').width / 14,
    paddingLeft: 10,
    paddingTop: 5,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#0162d0',
    marginRight: '2%',
    width: 60,
    height: 30,
    borderWidth: 1,
    borderColor: '#0162d0',
    borderRadius: 5,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  avatarCircle: {
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    borderColor: 'white',
    justifyContent: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});

export default styles;
