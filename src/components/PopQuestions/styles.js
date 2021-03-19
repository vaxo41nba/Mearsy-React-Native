import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContent: {
    flexDirection: 'row',
    marginTop: 25,
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
    borderColor: 'transparent',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    marginLeft: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
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
    fontSize: 18,
  },
  userNameSurnameDark: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 18,
  },
  commentContainer: {
    paddingTop: 10,
    marginLeft: 40,
  },
  commentTextLight: {
    color: 'gray',
    fontSize: 15,
  },
  commentTextDark: {
    color: 'white',
    fontSize: 15,
  },
  dateTextLight: {
    color: 'gray',
    fontSize: 16,
    paddingTop: 8,
    marginLeft: 5,
  },
  dateTextDark: {
    color: 'white',
    fontSize: 16,
    paddingTop: 8,
    marginLeft: 5,
  },
  logoStyle: {
    height: 20,
    width: 20,
  },
  voteContainer: {
    flexDirection: 'row',
    marginRight: 30,
    marginTop: 10,
  },
  voteText: {
    color: 'gray',
    fontSize: 13,
    marginLeft: 10,
  },
  disabledVoteText: {
    color: '#1890ff',
    fontSize: 13,
    marginLeft: 10,
  },
  quantityPositiveText: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'green',
    fontWeight: 'bold',
  },
  quantityNegativeText: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  buttonItemsContainer: {
    flexDirection: 'row',
  },
  upvoteImage: {
    width: 20,
    height: 20,
  },
  downVoteImage: {
    width: 20,
    height: 20,
    transform: [{ rotate: '180deg' }],
    marginLeft: 20,
  },
});

export default styles;
