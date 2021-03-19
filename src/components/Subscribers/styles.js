import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    top: 25,
    left: 10,
  },
  cardsContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '80%',
    height: Dimensions.get('screen').height / 3,
    borderRadius: 8,
  },
  blackListButton: {
    backgroundColor: '#ff4d4f',
    borderColor: '#ff4d4f',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 30,
    alignSelf: 'flex-end',
    marginLeft: 10,
    bottom: 5,
  },
  removeFromBlacklistButton: {
    backgroundColor: 'white',
    borderColor: '#ff4d4f',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 30,
    alignSelf: 'flex-end',
    marginLeft: 10,
    bottom: 5,
  },
  removeFromBlacklistText: {
    color: '#ff4d4f',
    fontWeight: 'bold',
    fontSize: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardTitleText: {
    paddingTop: 5,
    paddingLeft: 15,
    fontSize: 24,
  },
  cardSubText: {
    color: '#40a9ff',
    fontSize: 18,
  },
  cardTextInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    width: 250,
    height: 30,
    paddingLeft: 10,
    fontSize: 12,
    paddingTop: 5,
  },
  invitationInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    width: 250,
    height: 30,
    paddingLeft: 10,
    fontSize: 12,
    paddingTop: 5,
  },
  cancelInvitation: {
    borderColor: 'red',
    backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    width: 20,
    height: 20,
    top: 10,
  },
  cancelInvitationText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  cardMainContentHolder: {
    alignSelf: 'center',
    marginTop: 20,
    height: '60%',
    justifyContent: 'center',
  },
  cardButton: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#40a9ff',
    borderWidth: 1,
    borderColor: '#40a9ff',
    width: 120,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  cardButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  bottomBorder: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderWidth: 1,
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
  },
  sendIconStyle: {
    marginLeft: 10,
  },
  inputAndButtonHolder: {
    flexDirection: 'row',
  },
  invitationInputAndButton: {
    flexDirection: 'row',
    top: 15,
    alignSelf: 'center',
  },
  popularQuestionsText: {
    fontSize: 15,
    marginTop: 2,
  },
  popularQuestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 300,
  },
  voteQuantityPositiveText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    right: 0,
    position: 'absolute',
  },
  readMoreButton: {
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#40a9ff',
    borderWidth: 1,
    borderColor: '#40a9ff',
    width: 200,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  personalCommentsText: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subscriptionsMainContent: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  subscriptionNameSurnameHolder: {
    flexDirection: 'row',
  },
  subscriptionText: {
    color: '#1890ff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
    top: 10,
  },
  subscriptionAvatarHolder: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 20,
  },
  subscriptionsAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  unsubscribeButton: {
    backgroundColor: 'white',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 30,
    width: Dimensions.get('screen').width / 5,
    alignSelf: 'flex-end',
    marginLeft: 10,
    bottom: 5,
  },
  unsubscribeButtonText: {
    color: '#1890ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subscribeButton: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 30,
    width: Dimensions.get('screen').width / 5,
    alignSelf: 'flex-end',
    marginLeft: 10,
    bottom: 5,
  },
  userInfoContainer: {
    width: '40%',
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subscriptionButton: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'flex-end',
    right: 10,
  },
});

export default styles;
