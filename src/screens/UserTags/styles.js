import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundStyle: {
    justifyContent: 'center',
  },
  containerLight: {
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 50,
    width: '90%',
    height: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
  containerDark: {
    alignSelf: 'center',
    backgroundColor: '#555555',
    marginTop: 50,
    width: '90%',
    height: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#555555',
  },
  checkboxContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  checkboxContainerText: {
    color: 'rgba(0,0,0,.65)',
    top: 8,
    fontWeight: 'bold',
  },
  checkboxContainerDark: {
    color: 'white',
    top: 8,
    fontWeight: 'bold',
  },
  categoriesListContainer: {
    alignSelf: 'center',
    paddingBottom: 25,
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoriesListText: {
    color: 'rgba(0,0,0,.65)',
    alignSelf: 'center',
  },
  inputContainer: {
    alignSelf: 'center',
    width: '100%',
    paddingBottom: 35,
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 4,
    width: '85%',
    height: 30,
  },
  textInputSideTextContainer: {
    borderRightWidth: 1,
    width: '10%',
    borderColor: '#d9d9d9',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  textInputSideText: {
    color: 'rgba(0,0,0,.65)',
    fontSize: 18,
    alignSelf: 'center',
  },
  textInputStyle: {
    padding: 5,
  },
  userTagsContainer: {
    flexDirection: 'row',
  },
  checkButton: {
    borderWidth: 1,
    borderColor: '#1890ff',
    backgroundColor: 'white',
    borderRadius: 4,
    width: '70%',
    height: 35,
    justifyContent: 'center',
    marginTop: 10,
  },
  checkButtonText: {
    color: '#1890ff',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#1890ff',
    backgroundColor: '#1890ff',
    borderRadius: 4,
    width: '70%',
    height: 35,
    justifyContent: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  noticeText: {
    color: '#1890ff',
    marginTop: 3,
  },
  yesOrNoButtonsContainer: {
    flexDirection: 'row',
  },
  yesOrNoButton: {
    borderWidth: 1,
    borderColor: '#1890ff',
    borderRadius: 4,
    marginLeft: 15,
    marginTop: 10,
    width: '20%',
    height: 25,
    justifyContent: 'center',
  },
  yesOrNoButtonText: {
    alignSelf: 'center',
    color: '#1890ff',
    fontWeight: 'bold',
  },
  unsubscribeButton: {
    borderWidth: 1,
    borderColor: '#ff4d4f',
    backgroundColor: '#ff4d4f',
    borderRadius: 4,
    width: '70%',
    height: 35,
    justifyContent: 'center',
    marginTop: 10,
  },
  settingsContainer: {
    marginTop: '25%',
  },
});

export default styles;
