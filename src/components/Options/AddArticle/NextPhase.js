import React, { useState } from 'react';

import {
  View, Text, TouchableOpacity, TextInput,
} from 'react-native';

import { NEXT_PUBLIC_ADMIN_URL } from '@env'; // eslint-disable-line import/no-unresolved
import Snackbar from 'react-native-snackbar';
import styles from './styles';

const NextPhase = ({
  newsInfo,
  setNextPhase,
  userLogInf,
  setNewsInfo,
  startAddingArticle,
}) => {
  const ADMIN_URL = NEXT_PUBLIC_ADMIN_URL;

  const {
    description, tags, category, title,
  } = newsInfo;

  const [postSet, setPost] = useState(false);

  const savePost = async (postType) => {
    const post = {
      ...newsInfo,
      date: new Date(),
      authorName: newsInfo.author,
      author: userLogInf._id,
    };

    if (post.text.length === 0) {
      Snackbar.show({
        text: 'Detailed descripion can not be empty',
        duration: 3000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else {
      fetch(`${ADMIN_URL}/newsApi/savePost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newsData: post, postType }),
      })
        .then((res) => res.json())
        .then(() => {
          startAddingArticle(false);
          setPost(false);
        })
        .catch((err) => err);
    }
  };

  return (
    <View style={styles.nextPhaseContainer}>
      <View style={styles.nextPhaseCard}>
        <Text style={styles.nextPhaseCardText}>
          Category:
          {category}
        </Text>
        <View style={styles.nextPhaseTagsContainer}>
          <Text style={styles.nextPhaseCardText}>Tags:</Text>
          {tags.map((i) => (
            <Text style={styles.nextPhaseCardSubtext} key={i}>
              #
              {i}
            </Text>
          ))}
        </View>
        <Text style={styles.nextPhaseCardText}>
          Title:
          {title}
        </Text>
        <Text style={styles.nextPhaseCardText}>
          Description:
          {description}
        </Text>
        <TouchableOpacity
          style={[styles.nextPhaseButton, { marginBottom: 5 }]}
          onPress={() => setNextPhase(false)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nextPhaseMainContent}>
        <TouchableOpacity
          style={styles.nextPhaseButton}
          onPress={() => setPost(!postSet)}
        >
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
        {postSet ? (
          <View style={styles.nextPhaseConfirmationHolder}>
            <View>
              <Text style={styles.nextPhaseText}>Are you sure?</Text>
            </View>
            <View style={styles.nextPhaseButtonsContainer}>
              <TouchableOpacity
                style={styles.nextPhaseConfirmationButton}
                onPress={() => savePost('News')}
              >
                <Text style={styles.nextPhaseConfirmationButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextPhaseConfirmationButton}
                onPress={() => {
                  setPost(false);
                  startAddingArticle(false);
                }}
              >
                <Text style={styles.nextPhaseConfirmationButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
      <View style={styles.detailedDescriptionInput}>
        <TextInput
          multiline
          placeholder="Detailed Description"
          placeholderTextColor="gray"
          onChangeText={(val) => setNewsInfo({ ...newsInfo, text: val })}
          style={styles.detailedDescription}
        />
      </View>
    </View>
  );
};

export default NextPhase;
