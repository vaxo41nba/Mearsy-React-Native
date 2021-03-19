import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  contentLight: {
    flexWrap: 'wrap',
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
  },
  contentDark: {
    flexWrap: 'wrap',
    backgroundColor: '#555555',
    width: '95%',
    alignSelf: 'center',
  },
  block: {
    padding: 15,
  },
  titleImage: {
    width: Dimensions.get('screen').width - 30,
    alignSelf: 'center',
    height: Dimensions.get('screen').height / 3,
    resizeMode: 'cover',
  },
  titleLight: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '80%',
  },
  titleDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    width: '80%',
  },
  description: {
    color: 'rgba(0,0,0,.65)',
  },
  secondaryTextLight: {
    marginTop: 2,
    fontSize: 14.5,
    color: 'rgba(0,0,0,.65)',
  },
  secondaryTextDark: {
    marginTop: 2,
    color: 'white',
    fontSize: 14.5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  commentInput: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#1890ff',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: Dimensions.get('screen').width - 165,
    height: 35,
    marginRight: 20,
  },
  addCommentButton: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
    width: Dimensions.get('screen').width / 5,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCommentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentsContainer: {
    paddingHorizontal: 15,
  },
  authorText: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postCategoryTextLight: {
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: '15%',
  },
  postCategoryTextDark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: '15%',
  },
  mainContentHolder: {
    left: 5,
  },
  smallCircle: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 30 / 2,
    backgroundColor: 'lightgreen',
    borderColor: 'transparent',
  },
  optionsCircle: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 33,
    height: 33,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    right: 20,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  optionsDot: {
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: 3,
    height: 3,
    marginTop: 2,
  },
  circleAndTitleContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  optionsMainDropdownHolderLight: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    right: 10,
    width: 180,
  },
  optionsMainDropdownHolderDark: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    marginTop: 10,
    right: 10,
    width: 180,
    backgroundColor: 'white',
  },
  optionsDropdown: {
    flexDirection: 'row',
  },
  reportText: {
    marginLeft: 10,
    color: 'rgba(0,0,0,.65)',
  },
  commentInputHolder: {
    left: 10,
  },
  offlineTextLight: {
    alignSelf: 'center',
    fontSize: 16,
  },
  offlineTextDark: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
