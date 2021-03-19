import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';

import DocumentPicker from 'react-native-document-picker';

import styles from './styles';

const AddAudioOption = ({ audioBack }) => {
  const checkTheme = useSelector((state) => state.user.lightTheme);

  const audioHeader = '';
  const category = '';
  const preview = '';

  const uploadAudio = async () => {
    const sum = audioHeader + category + preview;
    await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
      readContent: [DocumentPicker.readContent],
    });
    return sum;
  };

  return (
    <ScrollView
      style={checkTheme ? styles.containerDark : styles.containerLight}
    >
      <Text style={checkTheme ? styles.uploadTextDark : styles.uploadTextLight}>
        Upload Audio
      </Text>
      <View style={styles.containers}>
        <View style={styles.titleText}>
          <Text style={styles.isRequiredSymbol}>* </Text>
          <Text style={checkTheme ? styles.titlesDark : styles.titlesLight}>
            Title:
          </Text>
        </View>
        <TextInput
          // onChangeText={(text) => (audioHeader = text)}
          style={styles.input}
          placeholder="Audio Header"
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.containers}>
        <View style={styles.titleText}>
          <Text style={styles.isRequiredSymbol}>* </Text>
          <Text style={checkTheme ? styles.titlesDark : styles.titlesLight}>
            Category:
          </Text>
        </View>
        <TextInput
          // onChangeText={(text) => (category = text)}
          style={styles.input}
          placeholder="Choose Category"
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.containers}>
        <View style={styles.titleText}>
          <Text style={styles.isRequiredSymbol}>* </Text>
          <Text style={checkTheme ? styles.titlesDark : styles.titlesLight}>
            Preview:
          </Text>
        </View>
        <TextInput
          // onChangeText={(text) => (preview = text)}
          style={styles.input}
          placeholder="Thumbnail link"
          placeholderTextColor="gray"
        />
      </View>
      <TouchableOpacity onPress={() => uploadAudio()}>
        <Image
          style={styles.uploadLogo}
          source={require('../../../images/upload.png')}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              audioBack();
            }}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => uploadAudio()}
          >
            <Text style={styles.secondaryButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddAudioOption;
