import React, { useState, useEffect } from 'react';

import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import { NEXT_PUBLIC_URL_HEROKU } from '@env'; // eslint-disable-line import/no-unresolved
import Input from '../Input';
import Category from '../Categories';

import * as actions from '../../redux/user/actions';

import styles from './styles';

const SignIn = ({ navigation }) => {
  const URL = NEXT_PUBLIC_URL_HEROKU;

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    isPublicProfile: true,
  });
  const [register, startRegister] = useState(false);
  const [personalDataPhase, setFirstPhase] = useState(true);
  const [categoriesPhrase, setCategories] = useState(false);
  const [error, setError] = useState('false');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, awaitLogin] = useState(false);
  const [reg, awaitReg] = useState(false);

  const categoriesList = useSelector((state) => state.user.categories);
  const checkTheme = useSelector((state) => state.user.lightTheme);
  const registerStatus = useSelector((state) => state.user.registrationStatus);
  const selectedCategoriesList = useSelector(
    (state) => state.user.selectedCategories,
  );

  useEffect(() => {
    categoriesList.length === 0 ? dispatch(actions.genCategories()) : null;
  }, []);

  const registrationHandler = () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    const {
      email, password, confirmPassword, name, surname,
    } = form;
    if (re.test(email) === false) {
      setError(true);
      setCategories(false);
      setErrorMessage('Enter valid email address');
    } else if (password === '') {
      setError(true);
      setCategories(false);
      setErrorMessage('Enter valid password');
    } else if (password.length < 6) {
      setError(true);
      setCategories(false);
      setErrorMessage('Password must contain minimum 6 characters');
    } else if (confirmPassword !== password || confirmPassword === '') {
      setError(true);
      setCategories(false);
      setErrorMessage('Passwords must match');
    } else if (name === '') {
      setError(true);
      setCategories(false);
      setErrorMessage('Please enter your name');
    } else if (surname === '') {
      setError(true);
      setCategories(false);
      setErrorMessage('Please enter your surname');
    } else if (selectedCategoriesList.length === 0) {
      setFirstPhase(false);
      setCategories(true);
    } else if (registerStatus === '400') {
      setError(true);
      setCategories(false);
      setErrorMessage('Account already exsists');
    } else {
      startRegister(true);
      setError(false);
    }
  };

  const confirmRegistration = () => {
    const {
      email, password, name, surname, isPublicProfile,
    } = form;
    awaitReg(true);

    return fetch(`${URL}/authApi/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLocaleLowerCase(),
        password,
        role: 'user',
        emailVerificationCode: `${Math.random() * 1e17}`,
        selectedCategories: selectedCategoriesList.map((i) => i.name),
        name,
        surname,
        isPublicProfile,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          awaitReg(false);
          setError(true);
          setCategories(false);
          setErrorMessage('Account already exsists');
        } else if (res.status === 201) {
          awaitReg(false);
          setError(false);
          startRegister(false);
        }
      })
      .catch(() => {
        awaitReg(false);
        setError(true);
        setCategories(false);
        setErrorMessage('Account already exsists');
      });
  };

  const checkAll = () => {
    const findNotChosen = categoriesList.some((i) => i.chosen === false);
    if (findNotChosen === true) {
      const newList = categoriesList.filter((i) => (i.chosen = true));
      dispatch(actions.selectAll(newList));
    } else {
      const newList = categoriesList.filter((i) => (i.chosen = false));
      dispatch(actions.selectAll(newList));
    }
  };

  const handleLogin = () => {
    const { email, password } = form;
    awaitLogin(true);

    fetch(`${URL}/authApi/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.toLocaleLowerCase(),
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === 'user not found') {
          setError(true);
          setErrorMessage('Invalid Login');
          awaitLogin(false);
        } else if (res.message === 'wrong password or email') {
          setError(true);
          setErrorMessage('Invalid Login');
          awaitLogin(false);
        } else if (res.errors) {
          setError(true);
          setErrorMessage('Invalid Login');
          awaitLogin(false);
        } else {
          setError(false);
          dispatch(actions.setUserInfo(res));
          dispatch(actions.setLogin(false));
          dispatch(actions.setLoginStatus(res));
          const userData = JSON.stringify(res);
          AsyncStorage.setItem('@userData', userData);
          awaitLogin(false);
        }
      })
      .catch((e) => e);
  };

  return (
    <View style={styles.main}>
      {/* Header */}
      {/* <Image
        source={require('../../images/authHeader.png')}
        style={styles.headerImage}
      /> */}
      <>
        <View style={checkTheme ? styles.containerLight : styles.containerDark}>
          {/* Back to Main Page */}
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => dispatch(actions.setLogin(false))}
          >
            <Text style={styles.goBackText}>Close</Text>
          </TouchableOpacity>

          <Text style={checkTheme ? styles.titleLight : styles.titleDark}>
            Welcome to Mearsy
          </Text>
          <View style={styles.logInContainer}>
            {register ? (
              <>
                {/* If user choses registration */}
                <Text
                  style={
                    checkTheme
                      ? styles.logInContainerTitleLight
                      : styles.logInContainerTitleDark
                  }
                >
                  Register
                </Text>
                {categoriesPhrase ? (
                  <>
                    <View style={styles.selectAllContainer}>
                      <Text
                        style={
                          checkTheme
                            ? styles.selectAllTextLight
                            : styles.selectAllTextDark
                        }
                      >
                        Select All
                      </Text>
                      <BouncyCheckbox
                        onPress={() => checkAll()}
                        text=""
                        borderWidth={2}
                        borderRadius={4}
                        borderColor="#1890ff"
                        fillColor="#1890ff"
                        size={20}
                      />
                    </View>

                    <View style={styles.categoriesContainer}>
                      {categoriesList.map((i) => (
                        <Category
                          text={i.name}
                          chosen={i.chosen}
                          key={i.name}
                        />
                      ))}
                    </View>

                    <View style={styles.buttonsHolder}>
                      {reg ? (
                        <ActivityIndicator size="small" color="#1890ff" />
                      ) : (
                        <>
                          <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => confirmRegistration()}
                          >
                            <Text style={styles.primaryButtonText}>
                              Register
                            </Text>
                          </TouchableOpacity>
                          <Text
                            style={
                              checkTheme
                                ? styles.orTextLight
                                : styles.orTextDark
                            }
                          >
                            Or back to
                          </Text>
                          <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => startRegister(false)}
                          >
                            <Text style={styles.secondaryButtonText}>
                              Login
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                      <View>
                        {/* Error message incase of invalid registration */}
                        {error ? (
                          <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <Input
                      text="Email"
                      onChangeText={(text) => setForm({ ...form, email: text })}
                      placeholder="Email"
                      placeholderTextColor="gray"
                    />
                    <Input
                      text="Password"
                      onChangeText={(text) =>
                        setForm({ ...form, password: text })}
                      secureTextEntry
                      placeholder="Password"
                      placeholderTextColor="gray"
                    />
                    <Input
                      text="Confirm Password"
                      secureTextEntry
                      placeholder="Confirm Password"
                      placeholderTextColor="gray"
                      onChangeText={(text) =>
                        setForm({ ...form, confirmPassword: text })}
                    />
                    <Input
                      text="Name"
                      onChangeText={(text) => setForm({ ...form, name: text })}
                      placeholder="First name"
                      placeholderTextColor="gray"
                    />
                    <Input
                      text="Surname"
                      placeholder="Surname"
                      placeholderTextColor="gray"
                      onChangeText={(text) => setForm({ ...form, surname: text })}
                    />
                    <View style={styles.publicProfileContainer}>
                      <Text
                        style={
                          checkTheme
                            ? styles.publicProfileTextLight
                            : styles.publicProfileTextDark
                        }
                      >
                        Public profile
                      </Text>
                      <BouncyCheckbox
                        onPress={() => {
                          setForm({
                            ...form,
                            isPublicProfile: !form.isPublicProfile,
                          });
                        }}
                        isChecked={form.isPublicProfile}
                        text=""
                        borderWidth={2}
                        borderRadius={4}
                        borderColor="#1890ff"
                        fillColor="#1890ff"
                        size={20}
                      />
                    </View>
                    <View>
                      {/* Error message incase of invalid registration */}
                      {error && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                      )}
                    </View>

                    <View style={styles.buttonsHolder}>
                      <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => registrationHandler()}
                      >
                        <Text style={styles.primaryButtonText}>Continue</Text>
                      </TouchableOpacity>
                      <Text
                        style={
                          checkTheme ? styles.orTextLight : styles.orTextDark
                        }
                      >
                        Or back to
                      </Text>
                      <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => startRegister(false)}
                      >
                        <Text style={styles.secondaryButtonText}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                <View style={styles.registrationPhaseHolder}>
                  <TouchableOpacity
                    style={styles.personalDataChoiceHolder}
                    onPress={() => {
                      setCategories(false);
                      setFirstPhase(true);
                    }}
                  >
                    <View
                      style={
                        personalDataPhase
                          ? styles.chosenCircle
                          : styles.disabledCircle
                      }
                    >
                      <Text
                        style={
                          personalDataPhase
                            ? styles.chosenCircleText
                            : styles.disabledCircleText
                        }
                      >
                        1
                      </Text>
                    </View>
                    <Text
                      style={
                        personalDataPhase
                          ? styles.chosenPhaseText
                          : styles.disablePhaseText
                      }
                    >
                      Personal Data
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.stick}>|</Text>
                  <TouchableOpacity
                    style={styles.personalDataChoiceHolder}
                    onPress={() => {
                      setCategories(true);
                      setFirstPhase(false);
                    }}
                  >
                    <View
                      style={
                        categoriesPhrase
                          ? styles.chosenCircle
                          : styles.disabledCircle
                      }
                    >
                      <Text
                        style={
                          categoriesPhrase
                            ? styles.chosenCircleText
                            : styles.disabledCircleText
                        }
                      >
                        2
                      </Text>
                    </View>
                    <Text
                      style={
                        categoriesPhrase
                          ? styles.chosenPhaseText
                          : styles.disablePhaseText
                      }
                    >
                      Choose your favorite categories
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.login}>
                <Text
                  style={
                    checkTheme
                      ? styles.logInContainerTitleLight
                      : styles.logInContainerTitleDark
                  }
                >
                  Login
                </Text>
                <Input
                  text="Email"
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  placeholder="Email"
                  placeholderTextColor="gray"
                />
                <Input
                  text="Password"
                  secureTextEntry
                  onChangeText={(text) => setForm({ ...form, password: text })}
                  placeholder="Password"
                  placeholderTextColor="gray"
                />
                <View style={styles.optionContainer}>
                  <View style={styles.rememberMe}>
                    <BouncyCheckbox
                      text=""
                      borderWidth={2}
                      borderRadius={4}
                      borderColor="#1890ff"
                      fillColor="#1890ff"
                      size={20}
                    />
                    <Text
                      style={
                        checkTheme
                          ? styles.rememberMeTextLight
                          : styles.rememberMeTextDark
                      }
                    >
                      Remember Me
                    </Text>
                  </View>
                  <View style={styles.resetPassContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ForgotPassword')}
                    >
                      <Text
                        style={
                          checkTheme
                            ? styles.resetPassTextLight
                            : styles.resetPassTextDark
                        }
                      >
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  {error && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  )}
                </View>
                <View style={styles.buttonsHolder}>
                  {login ? (
                    <ActivityIndicator size="small" color="#1890ff" />
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => handleLogin()}
                      >
                        <Text style={styles.primaryButtonText}>Login</Text>
                      </TouchableOpacity>
                      <Text
                        style={
                          checkTheme ? styles.orTextLight : styles.orTextDark
                        }
                      >
                        Or
                      </Text>
                      <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => startRegister(true)}
                      >
                        <Text style={styles.secondaryButtonText}>Register</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      </>
    </View>
  );
};

export default SignIn;
