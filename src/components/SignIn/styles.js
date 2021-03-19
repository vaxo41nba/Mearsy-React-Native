import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  containerDark: {
    padding: 15,
    backgroundColor: '#555555',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    width: '95%',
    alignSelf: 'center',
    marginTop: '10%',
  },
  containerLight: {
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#1890ff',
    borderRadius: 5,
    width: '95%',
    alignSelf: 'center',
    marginTop: '10%',
  },
  main: {
    height: Dimensions.get('screen').height / 1,
  },
  goBackButton: {
    backgroundColor: '#ff4d4f',
    borderColor: '#ff4d4f',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 30,
    width: 80,
    alignSelf: 'flex-end',
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

  login: {
    alignItems: 'center',
  },
  logInContainer: {
    marginTop: 20,
  },
  logInContainerTitleLight: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  logInContainerTitleDark: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  registerShortInputContainer: {
    flexDirection: 'row',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    right: '10%',
  },
  rememberMeTextLight: {
    fontSize: 13,
    right: 15,
    fontWeight: 'bold',
  },
  rememberMeTextDark: {
    fontSize: 13,
    right: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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
  secondaryButton: {
    borderRadius: 7,
    borderWidth: 1,
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#1890ff',
  },
  secondaryButtonText: {
    color: '#1890ff',
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
    color: '#ff4d4f',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  headerImage: {
    height: Dimensions.get('screen').height / 5,
    width: '100%',
  },
  registrationPhaseHolder: {
    // flexDirection: 'row',
  },
  personalDataChoiceHolder: {
    flexDirection: 'row',
  },
  chosenCircle: {
    borderWidth: 1,
    borderColor: '#1890ff',
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    backgroundColor: '#1890ff',
  },
  chosenCircleText: {
    alignSelf: 'center',
    color: 'white',
  },
  chosenPhaseText: {
    left: 5,
    color: '#1890ff',
  },
  disabledCircle: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    backgroundColor: 'white',
  },
  selectAllTextLight: {
    fontWeight: 'bold',
  },
  selectAllTextDark: {
    fontWeight: 'bold',
    color: 'white',
  },
  disabledCircleText: {
    alignSelf: 'center',
    color: 'gray',
  },
  disablePhaseText: {
    left: 5,
    color: 'gray',
  },
  stick: {
    color: 'gray',
    padding: 7,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoriesButtonHolder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectAllContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  publicProfileContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  publicProfileTextLight: {
    fontWeight: 'bold',
    top: 10,
  },
  publicProfileTextDark: {
    fontWeight: 'bold',
    top: 10,
    color: 'white',
  },
  resetPassContainer: {
    top: 8,
    left: '100%',
  },
  resetPassTextLight: {
    fontWeight: 'bold',
    color: '#1890ff',
  },
  resetPassTextDark: {
    fontWeight: 'bold',
    color: 'white',
  },
  optionContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
  },
});

export default styles;
