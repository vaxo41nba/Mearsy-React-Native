import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { launchImageLibrary } from 'react-native-image-picker';

import { NEXT_PUBLIC_ADMIN_URL } from '@env'; // eslint-disable-line import/no-unresolved
import NextPhase from './NextPhase';

import styles from './styles';
import * as actions from '../../../redux/user/actions';

const AddArticleOption = ({ startAddingArticle }) => {
  const dispatch = useDispatch();

  const ADMIN_URL = NEXT_PUBLIC_ADMIN_URL;
  const checkTheme = useSelector((state) => state.user.lightTheme);
  const categorieList = useSelector((state) => state.user.categories);
  const userLogInf = useSelector((state) => state.user.userInfo);
  const [broadcast, setBroadcast] = useState(''); // eslint-disable-line no-unused-vars
  const [isHotNews, setHotNews] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(false); // eslint-disable-line no-unused-vars
  const [authorSelection, startSelectingAuthor] = useState(false);
  const [categorySelection, selectCategory] = useState(false);
  const [nextPhase, setNextPhase] = useState(false);
  const [loading, startLoading] = useState(false);
  const [upload, startUpload] = useState(false);
  const [tagsText, setTags] = useState(null);
  const [inputText, setInputText] = useState('');

  const [newsInfo, setNewsInfo] = useState({
    category: '',
    title: '',
    location: {
      country: '',
      state: '',
      county: '',
    },
    description: '',
    globalBroadcast: false,
    tags: [],
    text: '',
    thumbnail: null,
    imageCredit: '',
    author: `${userLogInf.name} ${userLogInf.surname}`,
    hot: {
      hotNews: isHotNews,
      pinnedHotNews: false,
    },
    circleTitle: '',
    sliderImage: '',
    sliderImageCredit: '',
    copyright: '',
  });

  const authorsList = [
    `${userLogInf.name} ${userLogInf.surname}`,
    'Dissociated Press',
  ];

  const radio_props = [
    {
      label: (
        <Text style={checkTheme ? styles.localGlobLight : styles.localGlobDark}>
          Local
        </Text>
      ),
      value: 0,
    },
    {
      label: (
        <Text style={checkTheme ? styles.localGlobLight : styles.localGlobDark}>
          Global
        </Text>
      ),
      value: 1,
    },
  ];

  const uploadImage = (response) => {
    const { type, base64 } = response;
    startLoading(true);
    startUpload(true);
    if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
      return fetch(`${ADMIN_URL}/awsApi/uploadThumbnail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imgCode: base64, type }),
      })
        .then((res) => res.json())
        .then((res) => {
          setNewsInfo({ ...newsInfo, thumbnail: res });
          startLoading(false);
        })
        .catch((err) => err);
    }
  };

  const selectPhotoTapped = () => {
    launchImageLibrary({ includeBase64: true }, (response) => {
      uploadImage(response);
      setPhoto(response);
    });
  };

  useEffect(() => {
    dispatch(actions.genCategories());
  }, []);

  const validateFirstPhase = async () => {
    const {
      category,
      title,
      tags,
      imageCredit,
      description,
      copyright,
    } = newsInfo;
    if (category === '') {
      setError(true);
      setErrorMessage('You must choose category');
    } else if (title === '') {
      setError(true);
      setErrorMessage('Please enter title for article');
    } else if (!photo) {
      setError(true);
      setErrorMessage('You must choose thumbnail');
    } else if (!title) {
      setError(true);
      setErrorMessage('Headline title can not be empty');
    } else if (!imageCredit) {
      setError(true);
      setErrorMessage('You must enter image credit');
    } else if (!description) {
      setError(true);
      setErrorMessage('Description can not be empty');
    } else if (!copyright) {
      setError(true);
      setErrorMessage('You must enter copyright');
    } else if (tags.length < 8) {
      setError(true);
      setErrorMessage('You must choose minimum 8 tags');
    } else if (loading) {
      setError(true);
      setErrorMessage('Please wait for image to load');
    } else {
      startLoading(!loading);
      setError(false);
      setNextPhase(true);
    }
  };

  const createTagsForArticle = (value) => {
    const findSimilarities = newsInfo.tags.filter((i) => i === value);
    findSimilarities.length > 0
      ? null
      : setNewsInfo({ ...newsInfo, tags: [...newsInfo.tags, value] });
    setInputText('');
  };

  const deleteTagFromList = (value) => {
    const newTags = newsInfo.tags.filter((i) => i !== value);
    setNewsInfo({ ...newsInfo, tags: newTags });
  };

  return (
    <ScrollView
      style={checkTheme ? styles.containerDark : styles.containerLight}
    >
      {nextPhase ? (
        <NextPhase
          startAddingArticle={startAddingArticle}
          newsInfo={newsInfo}
          setNewsInfo={setNewsInfo}
          setNextPhase={setNextPhase}
          userLogInf={userLogInf}
          photo={photo}
        />
      ) : (
        <View style={styles.articlesContainer}>
          <Text
            style={
              checkTheme
                ? styles.addArticleTextLight
                : styles.addArticleTextDark
            }
          >
            Add Article
          </Text>
          <View style={styles.instructionContainer}>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Broadcast
            </Text>
            <View style={styles.radioFormContainer}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={(label) => setBroadcast(label)}
                buttonSize={8}
                buttonOuterSize={20}
              />
            </View>
          </View>

          {/* Select Author */}

          <View style={styles.instructionContainer}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Author
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => startSelectingAuthor(!authorSelection)}
            >
              <Text style={styles.inputText}>{newsInfo.author}</Text>
            </TouchableOpacity>
          </View>
          <View>
            {authorSelection ? (
              <View style={styles.categoryContainer}>
                <ScrollView>
                  {authorsList.map((i) => (
                    <View key={i}>
                      <TouchableOpacity
                        onPress={() => {
                          startSelectingAuthor(!authorSelection);
                          setNewsInfo({ ...newsInfo, author: i });
                        }}
                      >
                        <Text style={styles.categoryText}>{i}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : null}
          </View>

          {/* Select Category */}
          <View style={styles.instructionContainer}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Category
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => selectCategory(!categorySelection)}
            >
              <Text style={styles.inputText}>
                {newsInfo.category === ''
                  ? 'Movies,Sport,Music..'
                  : newsInfo.category}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {categorySelection ? (
              <View style={styles.categoryContainer}>
                <ScrollView>
                  {categorieList.map((i) => (
                    <View key={i.name}>
                      <TouchableOpacity
                        onPress={() => {
                          selectCategory(!categorySelection);
                          setNewsInfo({ ...newsInfo, category: i.name });
                        }}
                      >
                        <Text style={styles.categoryText}>{i.name}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : null}
          </View>

          <View style={styles.instructionContainer}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Tags
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Keywords"
              placeholderTextColor="gray"
              defaultValue={inputText}
              onSubmitEditing={() => createTagsForArticle(tagsText)}
              onChangeText={(text) => {
                setTags(text);
                setInputText(text);
              }}
            />
          </View>
          <View>
            {newsInfo.tags.length === 0 ? null : (
              <View style={styles.chosenTagsContainer}>
                {newsInfo.tags.map((i) => (
                  <View style={styles.tagsContainer} key={i}>
                    <TouchableOpacity
                      style={styles.tagStyle}
                      onPress={() => deleteTagFromList(i)}
                    >
                      <Text style={styles.tagText}>{i}</Text>
                      <Text style={styles.tagXText}>x</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.instructionContainer}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Title
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Headline News"
              placeholderTextColor="gray"
              onChangeText={(text) => setNewsInfo({ ...newsInfo, title: text })}
            />
          </View>
          <View style={styles.instructionContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.isRequiredSymbol}>*</Text>
              <Text
                style={
                  checkTheme
                    ? styles.instructionTextLight
                    : styles.instructionTextDark
                }
              >
                Preview
              </Text>
            </View>

            {upload ? (
              <>
                {loading ? (
                  <View style={styles.activityContainer}>
                    <TouchableOpacity
                      onPress={() => startUpload(false)}
                      style={styles.clearPhotoCircle}
                    >
                      <Text style={styles.clearImageButtonText}>X</Text>
                    </TouchableOpacity>
                    <ActivityIndicator size="small" color="#1890ff" />
                  </View>
                ) : (
                  <View style={styles.imageAndButtonHolder}>
                    <Image
                      source={{ uri: `${newsInfo.thumbnail}` }}
                      style={styles.cardImage}
                    />
                    <TouchableOpacity
                      onPress={() => startUpload(false)}
                      style={styles.clearPhotoCircle}
                    >
                      <Text style={styles.clearImageButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.thumbnailContainer}>
                <TouchableOpacity
                  style={styles.thumbnailButton}
                  onPress={() => selectPhotoTapped()}
                >
                  <Text style={styles.thumbnailButtonText}>
                    Upload Thumbnail
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Image Credit
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Image Credit"
              placeholderTextColor="gray"
              onChangeText={(text) =>
                setNewsInfo({ ...newsInfo, imageCredit: text })}
            />
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Copyright
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Copyright"
              placeholderTextColor="gray"
              onChangeText={(text) =>
                setNewsInfo({ ...newsInfo, copyright: text })}
            />
          </View>
          <View style={styles.instructionContainer}>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Hot news
            </Text>
            <View style={{ width: '75%' }}>
              <BouncyCheckbox
                text=""
                borderWidth={2}
                borderRadius={4}
                borderColor="#1890ff"
                fillColor="#1890ff"
                size={20}
                onPress={() => setHotNews(!isHotNews)}
              />
            </View>
          </View>
          <View style={styles.instructionContainer}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextLight
                  : styles.instructionTextDark
              }
            >
              Description
            </Text>
            <TextInput
              style={styles.descriptionInput}
              multiline
              placeholderTextColor="gray"
              onChangeText={(text) =>
                setNewsInfo({ ...newsInfo, description: text })}
            />
          </View>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => validateFirstPhase()}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
export default AddArticleOption;
