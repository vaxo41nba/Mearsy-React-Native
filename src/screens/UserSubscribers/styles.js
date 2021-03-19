import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundStyle: {
    justifyContent: 'center',
  },
  containerLight: {
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 50,
    width: '95%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
  containerDark: {
    alignSelf: 'center',
    backgroundColor: '#555555',
    marginTop: 50,
    width: '95%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#555555',
  },
  subscriptionsMainContent: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    paddingBottom: 10,
  },
  generalSettingsContainer: {
    marginTop: '15%',
  },
  noSubscribersTextContainer: {
    justifyContent: 'center',
  },
  noSubscribersTextLight: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    height: 150,
    marginTop: '25%',
  },
  noSubscribersTextDark: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    height: 150,
    marginTop: '25%',
    color: 'white',
  },
});

export default styles;
