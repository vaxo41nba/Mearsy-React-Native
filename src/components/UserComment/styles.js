import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
  voteArrowUp: {
    width: 25,
    height: 25,
  },
  voteArrowDown: {
    width: 25,
    height: 25,
    transform: [{ rotate: '180deg' }],
    marginLeft: 10,
  },
  voteButton: {
    flexDirection: 'row',
  },
  replyMainContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
  replyMainContentHolder: {
    marginLeft: 10,
  },
  personalInfoContainer: {
    flexDirection: 'row',
  },
  circle: {
    borderWidth: 1,
    borderColor: '#1890ff',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#1890ff',
    justifyContent: 'center',
  },
  avatarCircle: {
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    borderColor: 'transparent',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  userInitials: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  userNameSurnameLight: {
    color: '#1890ff',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  userNameSurnameDark: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  commentContainer: {
    paddingTop: 10,
  },
  commentTextLight: {
    color: 'gray',
  },
  commentTextDark: {
    color: 'white',
  },
  dateTextLight: {
    color: 'gray',
    fontSize: 13,
    paddingTop: 8,
    marginLeft: 5,
  },
  dateTextDark: {
    color: 'white',
    fontSize: 13,
    paddingTop: 8,
    marginLeft: 5,
  },
  logoStyle: {
    height: 20,
    width: 20,
  },

  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteTextLight: {
    color: 'gray',
    fontSize: 13,
    marginHorizontal: 10,
    marginTop: 5,
  },
  voteTextDark: {
    color: 'white',
    fontSize: 13,
    marginHorizontal: 10,
    marginTop: 5,
  },
  quantityText: {
    color: 'gray',
    fontSize: 15,
    marginTop: 3,
    fontWeight: 'bold',
  },
  quantityTextPositive: {
    color: 'green',
    fontSize: 15,
    fontWeight: 'bold',
  },
  quantityTextNegative: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
  commentInput: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#1890ff',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '60%',
    height: 35,
    marginLeft: 5,
  },
  replyCircle: {
    borderWidth: 1,
    borderColor: '#1890ff',
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    backgroundColor: '#1890ff',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  replyCircleText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  replyMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  replyContainer: {
    flexDirection: 'row',
  },
  replyTextLight: {
    color: 'gray',
    fontSize: 13,
    marginLeft: 10,
  },
  replyTextDark: {
    color: 'white',
    fontSize: 13,
    marginLeft: 10,
  },
  replyInputContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 20,
  },
  replyInput: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#1890ff',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 35,
    flex: 1,
  },
  replyAddButton: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  replyAddButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  optionsCircle: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 33,
    height: 33,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
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
  optionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionText: {
    color: 'white',
    alignSelf: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  optionButton: {
    backgroundColor: '#1890ff',
    width: 120,
    height: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
  },
  replyIconsContainer: {
    flexDirection: 'row',
  },
  replyIconsAndText: {
    flexDirection: 'row',
    top: 15,
    left: 5,
    justifyContent: 'space-between',
    width: 25,
    height: 20,
  },
  replyLengthTextLight: {
    fontSize: 12,
    color: '#1890ff',
    fontWeight: 'bold',
  },
  replyLengthTextDark: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  addCommentButton: {
    backgroundColor: '#1890ff',
    height: 35,
    width: 75,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#1890ff',
    left: 5,
  },
  addCommentButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
