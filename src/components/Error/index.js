import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

import Footer from '../Footer';

const ErrorComponent = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.textAndIconContainer}>
      <Icon style={styles.errorIcon} name="error" size={200} color="#f43434" />
      <Text style={styles.errorText}>Connection Error</Text>
    </View>
    <View style={styles.footerContainer}>
      <Footer navigation={navigation} />
    </View>
  </View>
);

export default ErrorComponent;
