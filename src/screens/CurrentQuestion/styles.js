import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  comment: {
    color: 'white',
  },
  author: {
    color: '#1890ff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  createdAt: {
    color: 'white',
    fontSize: 14,
    marginBottom: 30,
  },
  backgroundContainerDark: {
    backgroundColor: '#555555',
  },

  backgroundContainerLight: {
    backgroundColor: '#F8F8F8',
  },
  containerDark: {
    alignSelf: 'center',
    backgroundColor: '#555555',
    justifyContent: 'center',
    width: '95%',
    marginTop: 50,
    borderRadius: 5,
  },

  containerLight: {
    alignSelf: 'center',
    backgroundColor: '#555555',
    justifyContent: 'center',
    width: '95%',
    marginTop: 50,
    borderRadius: 5,
  },
  titleContainer: {
    left: 20,
  },
  titleTextLight: {
    fontSize: 35,
    fontWeight: '200',
    color: '#555555',
  },
  titleTextDark: {
    fontSize: 35,
    fontWeight: '200',
    color: '#F8F8F8',
  },
  circle: {
    borderWidth: 1,
    borderColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    right: 1,
  },
  userInfContainer: {
    flexDirection: 'row',
  },
  userDetailedInfo: {
    flexDirection: 'row',
    marginTop: 10,
  },
  userInfoTextDark: {
    color: '#555555',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
  userInfoTextLight: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
  dateTextDark: {
    color: '#F8F8F8',
    fontSize: 12,
    marginLeft: 25,
    marginTop: 4,
  },
  dateTextLight: {
    color: '#555555',
    fontSize: 12,
    marginLeft: 25,
    marginTop: 4,
  },
  messageBodyContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  messageBodyText: {
    color: '#555555',
    fontSize: 14,
  },
  messageBodyTextDark: {
    color: '#F8F8F8',
    fontSize: 14,
  },
  messageActionsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  voteButton: {
    flexDirection: 'row',
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
  voteText: {
    color: 'gray',
    marginLeft: 5,
    marginTop: 3,
  },
  optionsCircle: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 33,
    height: 33,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginLeft: '30%',
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
  voteQuantityPositive: {
    color: 'green',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  voteQuantityNegative: {
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  disabledVoteText: {
    color: '#1890ff',
    marginLeft: 5,
    marginTop: 3,
  },
  currentAnswer: {
    borderBottomWidth: 2,
    height: 140,
    borderColor: 'white',
    marginBottom: 60,
  },
  answersContainer: {
    marginTop: 30,
    backgroundColor: '#555555',
    marginLeft: 30,
    marginRight: 30,
  },
  avatarComments: {
    marginRight: 5,
    width: 30,
    height: 30,
    borderRadius: 60 / 2,
    right: 1,
    marginTop: 5,
  },
  answerHeader: {
    flexDirection: 'row',
  },
  headerInfo: {
    marginLeft: 5,
  },
  upvoteImage: {
    height: 20,
    width: 20,
  },
  downvoteImage: {
    height: 20,
    width: 20,
    transform: [{ rotate: '180deg' }],
  },
  reply: {
    height: 20,
    width: 20,
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonItemsContainer: {
    flexDirection: 'row',
  },
  rightVote: {
    flexDirection: 'row',
  },
  // transform[{rotate: '180deg'}]
  voteColorDark: {
    color: '#F8F8F8',
  },
  voteColorLight: {
    color: '#555555',
  },
});

export default styles;
