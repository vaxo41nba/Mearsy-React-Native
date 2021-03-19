import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
import * as userActions from '../../redux/user/actions';
import * as questionActions from '../../redux/questions/actions';
import * as newsActions from '../../redux/news/actions';

import styles from './styles';

import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import SubscriptionsAccount from '../../components/Subscriptions';
import MiniPlayer from '../../components/MiniPlayer';
import Footer from '../../components/Footer';

const UserActivityScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  let invitationEmail = '';
  let questionText = '';

  const URL = NEXT_PUBLIC_URL_HEROKU;

  const popQuestions = useSelector((state) => state.questions.popularQuestions);
  const userQuestionsList = useSelector(
    (state) => state.questions.userQuestions,
  );
  const personalComms = useSelector((state) => state.user.userPersonalComments);
  const loggedUserInfo = useSelector((state) => state.user.userInfo);
  const subscribers = useSelector((state) => state.user.userFollowers);
  const subscriptions = useSelector((state) => state.user.userReaders);

  const [inviteFriend, startInviting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('@userData').then((data) => {
      dispatch(userActions.getUserInfo(JSON.parse(data)));
      dispatch(userActions.generateUserPersonalComments(JSON.parse(data)));
      dispatch(userActions.getUserFollowersAndReaders(JSON.parse(data)));
      dispatch(questionActions.generatePopularComments(JSON.parse(data)));
      dispatch(questionActions.getUserQuestions(JSON.parse(data)));
    });
  }, []);

  // TODO: Update info with user actions

  const findCommentArticle = (id) =>
    fetch(`${URL}/newsApi/findCurrentNews?data=${id}&text=true&type=id`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(
          newsActions.setCurrentNews({
            id,
            title: res[0].title,
            description: res[0].description,
            thumbnail: res[0].thumbnail,
            date: res[0].date,
          }),
        );
        navigation.navigate('CurrentPost');
      })
      .catch((e) => e);

  const sendInvitation = () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    if (re.test(invitationEmail === false)) {
      setError(true);
      setErrorMessage('Enter valid email');
    } else if (invitationEmail === '') {
      setError(true);
      setErrorMessage('Enter valid email');
    } else {
      setError(false);
      setErrorMessage('');
      startInviting(!inviteFriend);
      fetch(`${URL}/userApi/sendInvite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loggedUserInfo.email,
          emailInvite: invitationEmail.toLocaleLowerCase(),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res === 'Success') {
            Snackbar.show({
              text: 'Invitation have been sent',
              duration: 3000,
              action: {
                text: 'UNDO',
                textColor: 'green',
              },
            });
          } else {
            Snackbar.show({
              text: 'This email already received invitation',
              duration: 5000,
              action: {
                text: 'UNDO',
                textColor: 'green',
              },
            });
          }
        })
        .catch((e) => e);
    }
  };

  const createQuestion = () => {
    if (questionText === '') {
      Snackbar.show({
        text: 'Empty question can not be created',
        duration: 5000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else {
      fetch(`${URL}/questionsApi/createQuestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: loggedUserInfo.token,
        },
        body: JSON.stringify({
          authorId: loggedUserInfo._id,
          messageBody: questionText,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res === 'ok') {
            Snackbar.show({
              text: 'Question have been created',
              duration: 5000,
              action: {
                text: 'UNDO',
                textColor: 'green',
              },
            });
            dispatch(
              questionActions.setUserQuestions([
                ...userQuestionsList,
                {
                  messageBody: questionText,
                },
              ]),
            );
            questionText = '';
          }
        })
        .catch((e) => e);
    }
  };

  return (
    <ViewBackground>
      <ScrollView>
        {/* Subscribers */}
        <View style={styles.cardsContainer}>
          <Text style={styles.cardTitleText}>Subscribers</Text>
          <View style={styles.bottomBorder} />
          <View style={styles.cardMainContentHolder}>
            {!subscribers ? (
              <Text style={styles.cardSubText}>
                You have not found any subscribers yet
              </Text>
            ) : (
              <View>
                {subscribers.length === 0 ? (
                  <Text style={styles.cardSubText}>
                    You have not found any subscribers yet
                  </Text>
                ) : null}
              </View>
            )}

            {inviteFriend ? (
              <>
                <TouchableOpacity
                  style={styles.cancelInvitation}
                  onPress={() => startInviting(!inviteFriend)}
                >
                  <Text style={styles.cancelInvitationText}>X</Text>
                </TouchableOpacity>
                <View style={styles.invitationInputAndButton}>
                  <TextInput
                    onChangeText={(text) => (invitationEmail = text)}
                    style={styles.invitationInput}
                    placeholder="Send Invitation"
                    placeholderTextColor="lightgray"
                  />
                  <TouchableOpacity onPress={() => sendInvitation()}>
                    <Icon
                      name="send"
                      style={styles.sendIconStyle}
                      size={30}
                      color="#1890ff"
                    />
                  </TouchableOpacity>
                </View>
                {error ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
              </>
            ) : (
              <View>
                {!subscribers
                  ? null
                  : subscribers.map((user) => (
                    <TouchableOpacity
                      key={user.userId}
                      style={styles.subscriptionButton}
                      onPress={() => {
                        dispatch(userActions.getChosenUserInfo(user));
                        navigation.navigate('ChosenProfile');
                      }}
                    >
                      <View style={styles.subscriptionAvatarHolder}>
                        {user.avatar === '' ? (
                          <Image
                            source={require('../../images/defaultAvatar.png')}
                            style={styles.subscriptionsAvatar}
                          />
                        ) : (
                          <Image
                            source={{ uri: `${user.avatar}` }}
                            style={styles.subscriptionsAvatar}
                          />
                        )}
                      </View>
                      <View style={styles.subscriptionNameSurnameHolder}>
                        <Text style={styles.subscriptionText}>
                          {user.name}
                        </Text>
                        <Text style={styles.subscriptionText}>
                          {user.surname}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => startInviting(!inviteFriend)}
                >
                  <Text style={styles.cardButtonText}>Invite Friends</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {/* Subscriptions */}
        <View style={styles.cardsContainer}>
          <Text style={styles.cardTitleText}>Subscriptions</Text>
          <View style={styles.bottomBorder} />
          <View style={styles.cardMainContentHolder}>
            {!subscriptions ? (
              <Text style={styles.cardSubText}>
                You have not subscribed to anyone yet
              </Text>
            ) : (
              <View>
                {subscriptions.length === 0 ? (
                  <Text style={styles.cardSubText}>
                    You have not subscribed to anyone yet
                  </Text>
                ) : (
                  subscriptions.map((user) => (
                    <View
                      style={styles.subscriptionsMainContent}
                      key={user.userId}
                    >
                      <SubscriptionsAccount
                        user={user}
                        navigation={navigation}
                        loggedUserInfo={loggedUserInfo}
                      />
                    </View>
                  ))
                )}
              </View>
            )}
          </View>
        </View>
        {/* Ask a question */}
        <View style={styles.askQuestionContainer}>
          <Text style={styles.cardTitleText}>Ask a question</Text>
          <View style={styles.bottomBorder} />
          <View style={styles.cardMainContentHolder}>
            <View style={styles.inputAndButtonHolder}>
              <TextInput
                onChangeText={(text) => (questionText = text)}
                style={styles.cardTextInput}
                defaultValue={questionText}
                placeholder="Ask universe a interesting question"
                placeholderTextColor="lightgray"
              />
              <TouchableOpacity onPress={() => createQuestion()}>
                <Icon
                  name="send"
                  style={styles.sendIconStyle}
                  size={30}
                  color="#1890ff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Popular Questions */}
        <View style={styles.cardsContainer}>
          <Text style={styles.cardTitleText}>Popular Questions</Text>
          <View style={styles.bottomBorder} />
          <View style={styles.cardMainContentHolder}>
            {!popQuestions
              ? null
              : popQuestions.slice(0, 5).map((question) => (
                <View
                  style={styles.popularQuestionsContainer}
                  key={question.id}
                >
                  <Text style={styles.popularQuestionsText}>
                    {question.messageBody.substring(0, 30)}
                    ...
                  </Text>
                  <Text style={styles.voteQuantityPositiveText}>
                    {question.upvoteQuantity > 0
                      ? `+${question.upvoteQuantity}`
                      : question.upvoteQuantity}
                  </Text>
                </View>
              ))}
            {popQuestions.length === 0 ? null : (
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => navigation.navigate('PopularQuestions')}
              >
                <Text style={styles.cardButtonText}>Read More</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Your Questions */}
        <View style={styles.cardsContainer}>
          <Text style={styles.cardTitleText}>Your Questions</Text>
          <View style={styles.bottomBorder} />
          <View style={styles.cardMainContentHolder}>
            <View>
              {!userQuestionsList
                ? null
                : userQuestionsList.map((question) => (
                  <TouchableOpacity key={question.id}>
                    <Text style={styles.personalCommentsText}>
                      {question.messageBody}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </View>
        {/* Your Comments */}
        <View style={styles.cardsContainer}>
          <Text style={styles.cardTitleText}>Your Comments</Text>
          <View style={styles.bottomBorder} />
          <View style={styles.userTextsContainer}>
            {!personalComms
              ? null
              : personalComms.comments.map((comment) => (
                <TouchableOpacity
                  key={comment._id}
                  onPress={() => findCommentArticle(comment.articleId)}
                >
                  <Text style={styles.personalCommentsText}>
                    {comment.messageBody}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
      <MiniPlayer />
      <Footer navigation={navigation} />
    </ViewBackground>
  );
};

export default UserActivityScreen;
