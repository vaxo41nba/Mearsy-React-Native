import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
} from 'react-native';

import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

import { useSelector, useDispatch } from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import * as userActions from '../../redux/user/actions';
// import * as newsActions from '../../redux/news/actions';

import styles from './styles';

import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import GeneralSettings from '../../components/UserGeneralSettings';
import NewsCard from '../../components/NewsCard';
import Category from '../../components/Categories';
import Footer from '../../components/Footer';

const UserTagsScreen = ({ navigation }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;
  const dispatch = useDispatch();
  const [newsListByTag, setNewsListByTag] = useState(null);
  const [checkAll, setCheckAll] = useState(false);
  const [notice, setNotice] = useState(false);
  const [addOptions, setAddOption] = useState(false);
  const [tagExists, checkIfExists] = useState(false);
  const [inputText, setInputText] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');
  const loggedUserInfo = useSelector((state) => state.user.userInfo);
  const subscribedTags = useSelector((state) => state.user.userSubscribedTags);
  const activeSubscribedTags = useSelector(
    (state) => state.user.userSelectedTags,
  );

  // const onlyNames = activeSubscribedTags.map((i) => i.name);

  const checkTheme = useSelector((state) => state.user.lightTheme);

  // const categoriesList = useSelector((state) => state.user.categories);
  const activeNewsCategories = useSelector(
    (state) => state.news.activeCategories,
  );

  useEffect(() => {
    dispatch(userActions.genCategories());

    if (subscribedTags.length !== loggedUserInfo.subscribeTags.length) {
      loggedUserInfo.subscribeTags.map((tag) =>
        dispatch(userActions.setUserSubscribedTags({ name: tag, chosen: false })));
    }
  }, []);

  const findIfHasNews = () => {
    const findTags = activeNewsCategories.filter(
      (categ) => categ === inputText.toLocaleLowerCase(),
    );

    const checkForDuplicates = subscribedTags.filter(
      (tag) => tag.name.toLocaleLowerCase() === inputText.toLocaleLowerCase(),
    );

    if (inputText === '') {
      null;
    } else if (checkForDuplicates.length === 1) {
      setNotice(!notice);
      setNoticeMessage('You already subscribed to this tag');
      checkIfExists(true);
    } else if (findTags.length === 1) {
      setAddOption(!addOptions);
      setNotice(false);
      checkIfExists(true);
    } else {
      setNotice(!notice);
      checkIfExists(false);
      setNoticeMessage(
        'There are no articles with this tag,but there might be in the future,Do you still want to subscribe?',
      );
    }
  };

  const subscribeToTag = (userId, tags, type) => {
    fetch(`${URL}/tagApi/subscribeTags`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        tags: type === 'subscribe' ? [tags] : [...tags],
        type,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setInputText('');
        if (type === 'subscribe') {
          setAddOption(false);
          dispatch(
            userActions.setUserSubscribedTags({
              name: inputText.toLocaleLowerCase(),
              chosen: false,
            }),
          );
        } else {
          setAddOption(false);
          if (checkAll) {
            setNewsListByTag(null);
            setCheckAll(false);
          } else {
            setNewsListByTag(null);
            setCheckAll(false);
          }

          const removeActiveTags = subscribedTags.filter(
            (tag) => tag.chosen === false,
          );
          dispatch(userActions.removeSelectedTags(removeActiveTags));
        }
      })
      .catch((e) => e);
  };

  const addOptionHandler = () => {
    subscribeToTag(
      loggedUserInfo._id,
      inputText.toLocaleLowerCase(),
      'subscribe',
    );
  };

  const removeOptionHandler = () => {
    // subscribeToTag(loggedUserInfo._id, onlyNames, 'unsubscribe');
  };

  const checkAllTags = () => {
    const findNotChosen = subscribedTags.some((i) => i.chosen === false);
    if (findNotChosen === true) {
      const newList = subscribedTags.filter((i) => (i.chosen = true));
      setCheckAll(false);
      dispatch(userActions.selectAllTags(newList));
    } else {
      const newList = subscribedTags.filter((i) => (i.chosen = false));
      setCheckAll(true);
      dispatch(userActions.selectAllTags(newList));
    }
  };

  const getNewsByCategory = (category) => {
    const chosenTags = category.map((cat) => cat.name.toLocaleLowerCase());
    fetch(`${URL}/newsApi/getNewsByTags?limit=${5}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: loggedUserInfo._id,
        tags: chosenTags,
      }),
    })
      .then((res) => res.json())
      .then((res) => setNewsListByTag(res))
      .catch((e) => e);
  };

  const yesOrNoStateOptionHandler = (cancel) => {
    // !cancel ? checkIfExists(false)
    // setNotice(false)
    // setNoticeMessage('')
    // setInputText('')
    // addOptionHandler() :
    if (!cancel) {
      checkIfExists(false);
      setNotice(false);
      setNoticeMessage('');
      setInputText('');
      addOptionHandler();
    } else {
      checkIfExists(false);
      setNotice(false);
      setNoticeMessage('');
      setInputText('');
    }
  };

  return (
    <>
      <ViewBackground style={styles.backgroundStyle}>
        <View style={styles.settingsContainer}>
          <GeneralSettings navigation={navigation} />
        </View>

        <View style={checkTheme ? styles.containerLight : styles.containerDark}>
          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <Text
              style={
                checkTheme
                  ? styles.checkboxContainerText
                  : styles.checkboxContainerDark
              }
            >
              All Tags
            </Text>
            <BouncyCheckbox
              onPress={() => checkAllTags()}
              text=""
              borderWidth={2}
              borderRadius={4}
              borderColor="#1890ff"
              fillColor="#1890ff"
              size={20}
            />
          </View>
          <View style={styles.categoriesListContainer}>
            {/* Tags List */}
            {subscribedTags ? (
              <>
                {subscribedTags.length === 0 ? (
                  <Text style={styles.categoriesListText}>
                    You have not followed any tags yet
                  </Text>
                ) : (
                  subscribedTags.map((i) => (
                    <View style={styles.userTagsContainer} key={i.name}>
                      <Category
                        text={i.name}
                        tag
                        chosen={i.chosen}
                        subscribedTags={subscribedTags}
                      />
                    </View>
                  ))
                )}
              </>
            ) : null}
          </View>
          {/* Input */}
          <View style={styles.inputContainer}>
            <ScrollView />
            <View style={styles.textInputContainer}>
              <View style={styles.textInputSideTextContainer}>
                <Text style={styles.textInputSideText}>#</Text>
              </View>
              <TextInput
                onChangeText={(text) => setInputText(text)}
                defaultValue={inputText}
                style={styles.textInputStyle}
                placeholder="Add tags to subscribe to them"
                placeholderTextColor="lightgray"
              />
            </View>
            {notice ? (
              <>
                {tagExists ? (
                  <>
                    {/* Implement input control  */}
                    {inputText.length === 0 ? (
                      setNotice(false)
                    ) : (
                      <Text style={styles.noticeText}>{noticeMessage}</Text>
                    )}
                  </>
                ) : (
                  <>
                    <Text style={styles.noticeText}>{noticeMessage}</Text>
                    <View style={styles.yesOrNoButtonsContainer}>
                      <TouchableOpacity
                        style={styles.yesOrNoButton}
                        onPress={() => yesOrNoStateOptionHandler()}
                      >
                        <Text style={styles.yesOrNoButtonText}>Yes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.yesOrNoButton}
                        onPress={() => yesOrNoStateOptionHandler(true)}
                      >
                        <Text style={styles.yesOrNoButtonText}>No</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            ) : null}
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => findIfHasNews()}
            >
              <Text style={styles.checkButtonText}>Check</Text>
            </TouchableOpacity>
            {addOptions ? (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addOptionHandler()}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            ) : null}

            {activeSubscribedTags.length > 0 ? (
              <>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => getNewsByCategory(activeSubscribedTags)}
                >
                  <Text style={styles.addButtonText}>Get News</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.unsubscribeButton}
                  onPress={() => removeOptionHandler()}
                >
                  <Text style={styles.addButtonText}>Unsubscribe</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
          <ScrollView>
            {!newsListByTag
              ? null
              : newsListByTag.map((i) => (
                <NewsCard
                  key={i._id}
                  id={i._id}
                  title={i.title}
                  description={i.description}
                  category={i.category}
                  thumbnail={i.thumbnail}
                  date={i.date}
                  navigation={navigation}
                />
              ))}
          </ScrollView>
        </View>
      </ViewBackground>
      <Footer navigation={navigation} />
    </>
  );
};

export default UserTagsScreen;
