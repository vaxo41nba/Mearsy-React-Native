import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  containerDark: {
    padding: 15,
    backgroundColor: '#555555',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    marginTop: '10%',
    height: Dimensions.get('screen').height / 3,
  },
  containerLight: {
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    marginTop: '10%',
    height: Dimensions.get('screen').height / 3,
  },
  goBackButton: {
    backgroundColor: '#ff4d4f',
    borderColor: '#ff4d4f',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 80,
    alignSelf: 'flex-end',
  },
  headerImage: {
    height: Dimensions.get('screen').height / 5,
    width: '100%',
  },
  goBackText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  titleLight: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  titleDark: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  buttonsHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
  },
  primaryButton: {
    borderRadius: 7,
    borderWidth: 2,
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  orTextLight: {
    color: 'gray',
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  orTextDark: {
    color: 'white',
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  errorText: {
    alignSelf: 'center',
    color: '#ff4d4f',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputHolder: {
    alignSelf: 'center',
    width: '100%',
    marginLeft: '20%',
    marginTop: '10%',
  },
});

export default styles;
