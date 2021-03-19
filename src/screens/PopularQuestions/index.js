import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/AntDesign';
import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import PopQuestion from '../../components/PopQuestions';
import MiniPlayer from '../../components/MiniPlayer';
import Footer from '../../components/Footer';

import styles from './styles';

const PopularQuestionsScreen = ({ navigation }) => {
  const options = [
    {
      value: 'popularity',
      text: 'Popular First',
    },
    {
      value: 'newest',
      text: 'News First',
    },
  ];

  const checkTheme = useSelector((state) => state.user.lightTheme);

  const [choose, startChoosing] = useState(false);
  const [buttonLoading, startButtonLoading] = useState(false);
  const [listLoading, startListLoading] = useState(false);
  const [limit, setLimit] = useState(4); // eslint-disable-line no-unused-vars
  const [isEndList, setIsEnd] = useState(false);

  const [filter, setFilter] = useState('popularity');
  const [optionText, setOptionText] = useState('Popular First');
  const [page, setPage] = useState(1);
  const [mainQuestions, setMainQuestions] = useState([]);

  const URL = NEXT_PUBLIC_URL_HEROKU;

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetch(
      `${URL}/questionsApi/getListOfMaiQuestions?filter=${filter}&page=${page}&limit=${limit}`,
      { signal },
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          setIsEnd(true);
        } else {
          setMainQuestions(res);
          setPage(+page + 1);
        }
        res.length < limit && setIsEnd(true);
      })
      .catch((e) => e);
    return function cleanUp() {
      abortController.abort();
    };
  }, []);

  const loadMoreHandler = () => {
    startButtonLoading(true);
    fetch(
      `${URL}/questionsApi/getListOfMaiQuestions?filter=${filter}&page=${page}&limit=${limit}`,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          setIsEnd(true);
        } else {
          setMainQuestions([...mainQuestions, ...res]);
          setPage(+page + 1);
        }
        res.length < limit && setIsEnd(true);
        startButtonLoading(false);
      })

      .catch((e) => e);
  };

  const changeFilter = (e) => {
    startListLoading(true);
    setIsEnd(false);
    fetch(
      `${URL}/questionsApi/getListOfMaiQuestions?filter=${e}&page=${1}&limit=${limit}`,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.length < limit) {
          setIsEnd(true);
        } else {
          startListLoading(false);
          setMainQuestions(res);
          setPage(2);
        }
      })
      .catch((err) => err);
  };

  return (
    <ViewBackground>
      {listLoading ? (
        <ScrollView style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#1890ff"
            style={styles.listSpinner}
          />
        </ScrollView>
      ) : (
        <>
          <ScrollView
            style={checkTheme ? styles.containerLight : styles.containerDark}
          >
            <View style={styles.titleContainer}>
              <Text
                style={
                  checkTheme ? styles.titleTextLight : styles.titleTextDark
                }
              >
                Questions
              </Text>
            </View>
            <View style={styles.dropdownHolder}>
              <TouchableOpacity
                style={styles.dropDownButton}
                onPress={() => startChoosing(!choose)}
              >
                <Text
                  style={
                    checkTheme
                      ? styles.dropDownTextLight
                      : styles.dropDownTextDark
                  }
                >
                  {optionText}
                </Text>
                {choose ? (
                  <Icon
                    style={styles.arrow}
                    name="up"
                    size={15}
                    color={checkTheme ? 'gray' : 'white'}
                  />
                ) : (
                  <Icon
                    style={styles.arrow}
                    name="down"
                    size={15}
                    color={checkTheme ? 'gray' : 'white'}
                  />
                )}
              </TouchableOpacity>
              {choose ? (
                <View style={styles.optionsContainer}>
                  {options.map((text) => (
                    <TouchableOpacity
                      style={text === filter ? styles.chosenOptionButton : null}
                      key={text.id}
                      onPress={() => {
                        setFilter(text.value);
                        setOptionText(text.text);
                        startChoosing(!choose);
                        changeFilter(text.value);
                      }}
                    >
                      <Text
                        style={
                          checkTheme
                            ? styles.optionTextLight
                            : styles.optionTextDark
                        }
                      >
                        {text.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>

            {mainQuestions.map((info) => (
              <View key={info.id}>
                <PopQuestion
                  info={info}
                  checkTheme={checkTheme}
                  navigation={navigation}
                />
              </View>
            ))}

            <View style={styles.loadMoreButtonContainer}>
              {isEndList ? null : buttonLoading ? (
                <ActivityIndicator size="small" color="#1890ff" />
              ) : (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={() => loadMoreHandler()}
                >
                  <Text style={styles.loadMoreButtonText}>Load More</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
          <MiniPlayer />
          <Footer navigation={navigation} />
        </>
      )}
    </ViewBackground>
  );
};

export default PopularQuestionsScreen;
