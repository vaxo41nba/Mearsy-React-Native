import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useSelector } from 'react-redux';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved

import Snackbar from 'react-native-snackbar';
import ViewBackground from '../../components/CustomImageBackgrouond/ViewBackground';
import Footer from '../../components/Footer';
import Input from '../../components/Input';

import styles from './styles';

const ForgotPasswordScreen = ({ navigation }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkTheme = useSelector((state) => state.user.lightTheme);

  const sendEmailHandler = (em) => {
    setLoading(true);
    return fetch(`${URL}/mailApi/resetPass`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: em }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === 'Success') {
          navigation.navigate('Home');
          Snackbar.show({
            text: 'Instructions has been sent to your email',
            duration: 3000,
            action: {
              text: 'UNDO',
              textColor: 'green',
            },
          });
          setError(false);
          setErrorMessage('');
          setLoading(false);
        } else {
          setError(true);
          setErrorMessage('Invalid email');
          setLoading(false);
        }
      })
      .catch((err) => err);
  };

  const sendEmailValidation = () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

    if (!email) {
      setError(true);
      setErrorMessage('Invalid email');
      setLoading(false);
    } else if (!re.test(email)) {
      setError(true);
      setErrorMessage('Invalid email');
      setLoading(false);
    } else {
      sendEmailHandler(email.toLocaleLowerCase());
    }
  };

  return (
    <>
      <ViewBackground>
        {/* Header */}
        <Image
          source={require('../../images/authHeader.png')}
          style={styles.headerImage}
        />
        <View style={checkTheme ? styles.containerLight : styles.containerDark}>
          <Text style={checkTheme ? styles.titleLight : styles.titleDark}>
            Welcome to Mearsy
          </Text>
          <View style={styles.inputHolder}>
            <Input
              text="Email"
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="gray"
            />
          </View>
          {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          {loading ? (
            <ActivityIndicator size="small" color="#1890ff" />
          ) : (
            <View style={styles.buttonsHolder}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => sendEmailValidation()}
              >
                <Text style={styles.primaryButtonText}>Send</Text>
              </TouchableOpacity>
              <Text style={checkTheme ? styles.orTextLight : styles.orTextDark}>
                Or
              </Text>
              <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.goBackText}>Go back</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ViewBackground>
      <Footer navigation={navigation} />
    </>
  );
};

export default ForgotPasswordScreen;
