import React, { useState, useEffect } from 'react';

import {
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { NEXT_PUBLIC_ADMIN_URL } from '@env'; // eslint-disable-line import/no-unresolved
import * as actions from '../../../redux/user/actions';

import styles from './styles';

const AddVideoOption = ({ videoBack }) => {
  const checkTheme = useSelector((state) => state.user.lightTheme);
  const categorieList = useSelector((state) => state.user.categories);
  const userLogInf = useSelector((state) => state.user.userInfo);

  const [categoryChoose, selectCategory] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [videoData, setVideoData] = useState({
    title: '',
    category: '',
    link: '',
    thumbnail: '',
  });

  const dispatch = useDispatch();
  const ADMIN_URL = NEXT_PUBLIC_ADMIN_URL;

  useEffect(() => {
    dispatch(actions.genCategories());
  }, []);

  const uploadVideo = () => {
    const video = {
      date: new Date(),
      ...videoData,
      author: userLogInf._id,
    };

    fetch(`${ADMIN_URL}/videoApi/saveVideo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoData: video }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((e) => e);
  };

  const confirmVideoUpload = () => {
    const {
      title, category, link, thumbnail,
    } = videoData;
    const RegExpCorrectUrl = /^((https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

    if (title === '') {
      setError(true);
      setErrorMessage('Please enter title');
    } else if (category === '') {
      setError(true);
      setErrorMessage('Please choose category');
    } else if (link === '') {
      setError(true);
      setErrorMessage('Please enter link for the video');
    } else if (RegExpCorrectUrl.test(link) === false) {
      setError(true);
      setErrorMessage('Please use valid link for video');
    } else if (thumbnail === '') {
      setError(true);
      setErrorMessage('Please enter link for thumbnail');
    } else if (RegExpCorrectUrl.test(thumbnail) === false) {
      setError(true);
      setErrorMessage('Please enter valid link for thumbnail');
    } else {
      setError(false);
      uploadVideo();
    }
  };

  return (
    <ScrollView
      style={checkTheme ? styles.containerDark : styles.containerLight}
    >
      <View style={styles.addVideoContainer}>
        <Text style={checkTheme ? styles.addVideoDark : styles.addVideoLight}>
          Add Video
        </Text>
        {/* Select Category */}

        <View style={styles.instructionContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextDark
                  : styles.instructionTextLight
              }
            >
              Title
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Video Header"
            placeholderTextColor="gray"
            onChangeText={(text) => setVideoData({ ...videoData, title: text })}
          />
        </View>
        <View style={styles.instructionContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextDark
                  : styles.instructionTextLight
              }
            >
              Category
            </Text>
          </View>
          <TouchableOpacity
            style={styles.input}
            onPress={() => selectCategory(!categoryChoose)}
          >
            <Text style={styles.inputText}>
              {videoData.category === ''
                ? 'Choose Category'
                : videoData.category}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {categoryChoose ? (
            <View style={styles.categoryContainer}>
              <ScrollView>
                {categorieList.map((i) => (
                  <TouchableOpacity
                    key={i.name}
                    onPress={() => {
                      setVideoData({ ...videoData, category: i.name });
                      // setSelectedCategory(i.name);
                      selectCategory(!categoryChoose);
                    }}
                  >
                    <Text style={styles.categoryText}>{i.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
        <View style={styles.instructionContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextDark
                  : styles.instructionTextLight
              }
            >
              URL
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Video Link"
            placeholderTextColor="gray"
            onChangeText={(text) => setVideoData({ ...videoData, link: text })}
          />
        </View>
        <View style={styles.instructionContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.isRequiredSymbol}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.instructionTextDark
                  : styles.instructionTextLight
              }
            >
              Thumbnail
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Thumbnail Link"
            placeholderTextColor="gray"
            onChangeText={(text) =>
              setVideoData({ ...videoData, thumbnail: text })}
          />
        </View>
        {error ? <Text>{errorMessage}</Text> : null}
        <View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => videoBack()} style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => confirmVideoUpload()}
            >
              <Text style={styles.secondaryButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddVideoOption;
