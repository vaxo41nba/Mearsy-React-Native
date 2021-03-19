import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
} from 'react-native';

import { NEXT_PUBLIC_URL_HEROKU, NEXT_PUBLIC_ADMIN_URL } from '@env'; // eslint-disable-line import/no-unresolved

import { useSelector, useDispatch } from 'react-redux';

import Snackbar from 'react-native-snackbar';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as userActions from '../../redux/user/actions';

import ScrollViewBackground from '../../components/CustomImageBackgrouond/ScrollviewBackground';
import GeneralSettings from '../../components/UserGeneralSettings';
import AddRegionComponent from '../../components/AddRegion';
import BirthdayPicker from '../../components/DatePicker';
// import Category from '../../components/Categories';
import Footer from '../../components/Footer';

import styles from './styles';

const UserSettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const accountSecurity = ['Visible account', 'Hidden Account'];

  const URL = NEXT_PUBLIC_URL_HEROKU;
  const ADMIN_URL = NEXT_PUBLIC_ADMIN_URL;

  const generalCategories = useSelector(
    (state) => state.user.userGeneralCategories,
  );

  // const findOnlyActives = generalCategories.filter((i) => i.chosen === true);
  // const getOnlyNames = findOnlyActives.map((i) => i.name);
  const loggedUserInfo = useSelector((state) => state.user.userInfo);
  const { _id } = loggedUserInfo;

  const categoriesList = useSelector((state) => state.user.categories);
  const checkTheme = useSelector((state) => state.user.lightTheme);

  const [currentRegion, setCurrentRegion] = useState({
    country: '',
    state: '',
    region: '',
  });
  const [listOfCountries, setListOfCountries] = useState([]);
  const [listOfStates, setListOfStates] = useState([]);
  const [listOfRegions, setListOfRegions] = useState([]);

  const [changeProfile, setChangeProfile] = useState(false);
  const [pickDateStatus, setPickDateStatus] = useState(false);
  const [accountSecurityOption, chooseAccountSecurityOption] = useState(false);
  const [regionListSelector, setRegionListSelector] = useState(false);
  const [changePassword, startChangePassword] = useState(false);

  const [birthdayInformation, setBirthdayInformation] = useState({
    birthdayMonth: null,
    birthdayDay: null,
    birthdayYear: null,
  });

  const { birthdayMonth, birthdayDay, birthdayYear } = birthdayInformation;

  const [userFields, setUserFields] = useState({
    name: '',
    surname: '',
    email: '',
    isPublicProfile: '',
    birthday: '',
    aboutMe: '',
    selectedCategories: [],
    subscribeRegion: [],
    experience: '',
    education: '',
    skills: '',
    interests: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // const updateUserInfo = () => {
  //   AsyncStorage.getItem('@userData').then((data) => {
  //     if (data) {
  //       loggedUserInfo._id
  //         ? null
  //         : dispatch(userActions.getUserInfo(JSON.parse(data)));
  //     }
  //   });
  // };

  useEffect(() => {
    if (loggedUserInfo._id) {
      setUserFields({
        name: loggedUserInfo.name,
        surname: loggedUserInfo.surname,
        email: loggedUserInfo.email,
        isPublicProfile: loggedUserInfo.isPublicProfile,
        birthday: loggedUserInfo.birthday,
        aboutMe: loggedUserInfo.aboutMe,
        selectedCategories: loggedUserInfo.selectedCategories,
        subscribeRegion: loggedUserInfo.subscribeRegions || [],
        experience: loggedUserInfo.experience,
        education: loggedUserInfo.education,
        skills: loggedUserInfo.skills,
        interests: loggedUserInfo.interests,
        password: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  }, [loggedUserInfo._id]);

  useEffect(() => {
    const { country, state } = currentRegion;
    if (country && !state) {
      fetch(`${ADMIN_URL}/localizationApi/localization?country=${country}`)
        .then((res) => res.json())
        .then((result) => setListOfStates(result.states));
    } else if (country && state) {
      fetch(
        `${ADMIN_URL}/localizationApi/localization?country=${country}&state=${state}`,
      )
        .then((res) => res.json())
        .then((res) => setListOfRegions(res.counties));
    }
  }, [currentRegion]);

  useEffect(() => {
    fetch(`${ADMIN_URL}/localizationApi/localization`)
      .then((res) => res.json())
      .then((res) => setListOfCountries(res.countries));
  }, []);

  const findUserCategoriesInCategoriesList = (a1, a2) => {
    let diff = [];
    const namedArr1 = a1.map((i) => i.name);
    const namedArr2 = a2.map((i) => i.name);
    diff = namedArr1.filter((i) => !namedArr2.includes(i));
    diff.map((i) =>
      dispatch(
        userActions.setUserGeneralCategories({
          chosen: false,
          name: i,
        }),
      ));
  };

  useEffect(() => {
    findUserCategoriesInCategoriesList(categoriesList, generalCategories);
  }, []);

  const cancelUserProfileEditing = () => {
    setChangeProfile(false);
    startChangePassword(false);
    setRegionListSelector(false);
    setUserFields({
      name: loggedUserInfo.name,
      surname: loggedUserInfo.surname,
      email: loggedUserInfo.email,
      isPublicProfile: loggedUserInfo.isPublicProfile,
      birthday: loggedUserInfo.birthday,
      aboutMe: loggedUserInfo.aboutMe,
      selectedCategories: loggedUserInfo.selectedCategories,
      subscribeRegion: loggedUserInfo.subscribeRegions || [],
      experience: loggedUserInfo.experience,
      education: loggedUserInfo.education,
      skills: loggedUserInfo.skills,
      interests: loggedUserInfo.interests,
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  const changeUserInformationFields = (userId, field) =>
    fetch(`${URL}/userApi/updateUserInfoById`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        field,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        Snackbar.show({
          text: 'Success',
          duration: 1000,
          action: {
            text: 'UNDO',
            textColor: 'green',
          },
        });
        setChangeProfile(false);
      })
      .catch(() => {
        Snackbar.show({
          text: 'Unexpected error',
          duration: 1000,
          action: {
            text: 'UNDO',
            textColor: 'green',
          },
        });
        setChangeProfile(false);
      });

  const updatePassword = (userId) => {
    const { password, newPassword, confirmNewPassword } = userFields;
    if (!password) {
      Snackbar.show({
        text: 'Please Enter Your Password',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else if (!newPassword) {
      Snackbar.show({
        text: 'Please Enter New Password',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else if (newPassword !== confirmNewPassword) {
      Snackbar.show({
        text: 'Passwords Did Not Match',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else if (newPassword.length < 6) {
      Snackbar.show({
        text: 'New password must containt minimum 6 letters',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else {
      fetch(`${URL}/userApi/changePasswordAccordingPrevious`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          password,
          newPassword,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === 'success') {
            Snackbar.show({
              text: 'Pasword Changed',
              duration: 1000,
              action: {
                text: 'UNDO',
                textColor: 'green',
              },
            });
            startChangePassword(false);
            setChangeProfile(false);
          } else {
            Snackbar.show({
              text: 'Wrong old password',
              duration: 1000,
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

  const validateFields = () => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const {
      name,
      surname,
      email,
      aboutMe,
      experience,
      education,
      skills,
      interests,
      birthday,
      subscribeRegion,
    } = userFields;

    if (
      name === loggedUserInfo.name
      && surname === loggedUserInfo.surname
      && email === loggedUserInfo.email
      && aboutMe === loggedUserInfo.aboutMe
      && experience === loggedUserInfo.experience
      && education === loggedUserInfo.education
      && skills === loggedUserInfo.skills
      && interests === loggedUserInfo.interests
      && birthday === loggedUserInfo.birthday
      && subscribeRegion.length === loggedUserInfo.subscribeRegions.length
    ) {
      Snackbar.show({
        text: 'Nothing to save',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });

      setChangeProfile(false);
    } else if (!email) {
      Snackbar.show({
        text: 'Enter valid email',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else if (reg.test(email) === false) {
      Snackbar.show({
        text: 'Enter valid email',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else if (!name) {
      Snackbar.show({
        text: 'Name can not be empty',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else if (!surname) {
      Snackbar.show({
        text: 'Surname can not be empty',
        duration: 1000,
        action: {
          text: 'UNDO',
          textColor: 'green',
        },
      });
    } else {
      const field = [];
      if (loggedUserInfo.name !== name.trim()) {
        field.push({ name: name.trim() });
      }
      if (loggedUserInfo.surname !== surname.trim()) {
        field.push({ surname: surname.trim() });
      }
      if (loggedUserInfo.aboutMe !== aboutMe) {
        field.push({ aboutMe });
      }
      if (loggedUserInfo.experience !== experience) {
        field.push({ experience });
      }
      if (loggedUserInfo.education !== education) {
        field.push({ education });
      }
      if (loggedUserInfo.skills !== skills) {
        field.push({ skills });
      }
      if (loggedUserInfo.interests !== interests) {
        field.push({ interests });
      }
      if (loggedUserInfo.birthday !== birthday) {
        field.push({ birthday });
      }
      if (loggedUserInfo.subscribeRegions.length !== subscribeRegion.length) {
        field.push({ subscribeRegions: subscribeRegion });
      }

      changeUserInformationFields(_id, field);
      // updateUserInfo();
    }
  };

  const removeCountryFromList = (info) => {
    const filteredMap = userFields.subscribeRegion.filter(
      (i) => i.county !== info,
    );
    setUserFields({ ...userFields, subscribeRegion: filteredMap });
  };

  const addCountryToTheList = (payload) => {
    const { subscribeRegion } = userFields;
    const newList = [...subscribeRegion, payload];
    setUserFields({ ...userFields, subscribeRegion: newList });
  };

  const changeThemeHandler = () => {
    dispatch(userActions.setUserTheme(!checkTheme));
  };

  const cancelAddingRegionHandler = () => {
    setRegionListSelector(false);
    setCurrentRegion({
      ...currentRegion,
      region: '',
      country: '',
      state: '',
    });
  };

  return (
    <>
      <ScrollViewBackground>
        <View style={styles.generalOptionsContainer}>
          <GeneralSettings navigation={navigation} />
        </View>
        <View style={checkTheme ? styles.containerLight : styles.containerDark}>
          <View style={styles.mainContentContainer}>
            <View style={styles.changeThemeContainer}>
              <TouchableOpacity
                style={styles.changeThemeButton}
                onPress={() => changeThemeHandler()}
              >
                <Text style={styles.changeThemeButtonText}>
                  Change theme to
                  {' '}
                  {checkTheme ? 'Dark' : 'Light'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* User Profile Link / Questionable if needed,don't add it yet */}
          <View style={styles.mainContentContainer}>
            {changeProfile ? (
              <View style={styles.headerButtonsContainer}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => {
                    validateFields();
                  }}
                >
                  <Text style={styles.primaryButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => cancelUserProfileEditing()}
                >
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setChangeProfile(!changeProfile)}
              >
                <Text style={styles.primaryButtonText}>Change Profile</Text>
              </TouchableOpacity>
            )}

            <>
              {/* User name */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Name
                </Text>
                <TextInput
                  style={
                    changeProfile ? styles.inputStyle : styles.disableInput
                  }
                  defaultValue={userFields.name}
                  editable={changeProfile}
                  onChangeText={(text) =>
                    setUserFields({ ...userFields, name: text })}
                />
              </View>
              {/* User surname */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Surname
                </Text>
                <TextInput
                  style={
                    changeProfile ? styles.inputStyle : styles.disableInput
                  }
                  defaultValue={userFields.surname}
                  editable={changeProfile}
                  onChangeText={(text) =>
                    setUserFields({ ...userFields, surname: text })}
                />
              </View>
              {/* User Email */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Email
                </Text>
                <TextInput
                  style={
                    changeProfile ? styles.inputStyle : styles.disableInput
                  }
                  defaultValue={userFields.email}
                  editable={changeProfile}
                  onChangeText={(text) =>
                    setUserFields({ ...userFields, email: text })}
                />
              </View>
              {/* User Account Security */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Account Security
                </Text>
                <View style={styles.dropDownHolder}>
                  <TouchableOpacity
                    disabled={!changeProfile}
                    style={
                      changeProfile
                        ? styles.dropDownButton
                        : styles.disabledDropDownButton
                    }
                    onPress={() =>
                      chooseAccountSecurityOption(!accountSecurityOption)}
                  >
                    <Text>{accountSecurity[0]}</Text>
                  </TouchableOpacity>
                  {accountSecurityOption ? (
                    <View style={styles.userSecurityOptionsHolder}>
                      {accountSecurity.map((i) => (
                        <TouchableOpacity
                          onPress={() => chooseAccountSecurityOption(false)}
                          key={i}
                          style={styles.userSecurityOptionButton}
                        >
                          <Text>{i}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : null}
                </View>
              </View>
              {/* User Birthday */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Birthday
                </Text>
                <View
                  style={
                    changeProfile ? styles.inputStyle : styles.disableInput
                  }
                >
                  <TouchableOpacity
                    onPress={() => setPickDateStatus(!pickDateStatus)}
                    disabled={!changeProfile}
                  >
                    <Text style={{ color: 'gray' }}>
                      {!birthdayMonth ? 'MM' : birthdayMonth}
                      {' '}
                      /
                      {!birthdayDay ? 'DD' : birthdayDay}
                      {' '}
                      /
                      {!birthdayYear ? 'YY' : birthdayYear}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* About User */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  About me
                </Text>
                <TextInput
                  style={
                    changeProfile
                      ? styles.multilineInput
                      : styles.disableMultiLineInput
                  }
                  multiline
                  editable={changeProfile}
                  defaultValue={userFields.aboutMe}
                  onChangeText={(text) =>
                    setUserFields({ ...userFields, aboutMe: text })}
                />
              </View>
              {/* About User experience */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Experience
                </Text>
                <TextInput
                  style={
                    changeProfile
                      ? styles.multilineInput
                      : styles.disableMultiLineInput
                  }
                  multiline
                  defaultValue={userFields.experience}
                  editable={changeProfile}
                  onChangeText={(text) =>
                    setUserFields({ ...userFields, experience: text })}
                />
              </View>
              {/* About User Education */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Education
                </Text>
                <TextInput
                  style={
                    changeProfile
                      ? styles.multilineInput
                      : styles.disableMultiLineInput
                  }
                  multiline
                  editable={changeProfile}
                  defaultValue={userFields.education}
                  onChangeText={(text) =>
                    setUserFields({ ...userFields, education: text })}
                />
              </View>
              {/* About User skills */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Skills
                </Text>
                <TextInput
                  style={
                    changeProfile
                      ? styles.multilineInput
                      : styles.disableMultiLineInput
                  }
                  multiline
                  editable={changeProfile}
                  defaultValue={userFields.skills}
                  onChangeText={(text) =>
                    setUserFields({ ...userFields, skills: text })}
                />
              </View>
              {/* About user interests */}
              <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Interests
                </Text>
                <TextInput
                  style={
                    changeProfile
                      ? styles.multilineInput
                      : styles.disableMultiLineInput
                  }
                  multiline
                  editable={changeProfile}
                  defaultValue={userFields.interests}
                  onChangeText={(text) =>
                    setUserFields({ ...userFields, interests: text })}
                />
              </View>
              {/* About user categories */}
              {/* <View style={styles.userInfoContainer}>
                <Text style={checkTheme ? styles.textLight : styles.textDark}>
                  Categories
                </Text>
                <View style={styles.categoriesListContainer}>
                  {generalCategories === null
                    ? null
                    : generalCategories.map((i) => (
                        <Category
                          setForceRender={setForceRender}
                          forceRender={forceRender}
                          key={Math.random()}
                          text={i.name}
                          tag
                          chosen={i.chosen}
                          isDisabled={changeProfile}
                          settings
                          generalCategories={generalCategories}
                        />
                      ))}
                </View>
              </View> */}
              {/* Subscribes region list */}
              <View style={styles.userInfoContainer}>
                <View>
                  <TouchableOpacity
                    disabled={!changeProfile}
                    onPress={() => setRegionListSelector(!regionListSelector)}
                    style={
                      changeProfile
                        ? styles.userRegionsListButton
                        : styles.userRegionsListButtonDisabled
                    }
                  >
                    <Text style={styles.primaryButtonText}>Get Local News</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {regionListSelector ? (
                <AddRegionComponent
                  userFields={userFields}
                  checkTheme={checkTheme}
                  currentRegion={currentRegion}
                  listOfCountries={listOfCountries}
                  listOfRegions={listOfRegions}
                  listOfStates={listOfStates}
                  setCurrentRegion={setCurrentRegion}
                  addCountryToTheList={addCountryToTheList}
                  removeCountryFromList={removeCountryFromList}
                  cancelAddingRegionHandler={cancelAddingRegionHandler}
                />
              ) : null}
              {/* Password */}
              <View style={styles.userInfoContainer}>
                <View
                  style={
                    changePassword
                      ? styles.passwordButtonContainerDisabled
                      : styles.passwordButtonContainer
                  }
                >
                  <TouchableOpacity
                    disabled={!changeProfile}
                    onPress={() => startChangePassword(!changePassword)}
                    style={
                      changeProfile
                        ? styles.passwordButton
                        : styles.disabledPasswordButton
                    }
                  >
                    <Text style={styles.primaryButtonText}>
                      Change Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Change Password */}
              {changePassword ? (
                <View style={styles.changePasswordContainer}>
                  <Text
                    style={
                      checkTheme
                        ? styles.changePasswordInputTextLight
                        : styles.changePasswordInputTextDark
                    }
                  >
                    Old Password
                  </Text>
                  <TextInput
                    secureTextEntry
                    style={
                      changeProfile ? styles.inputStyle : styles.disableInput
                    }
                    editable={changeProfile}
                    onChangeText={(text) =>
                      setUserFields({ ...userFields, password: text })}
                  />
                  <Text
                    style={
                      checkTheme
                        ? styles.changePasswordInputTextLight
                        : styles.changePasswordInputTextDark
                    }
                  >
                    New Password
                  </Text>
                  <TextInput
                    secureTextEntry
                    style={
                      changeProfile ? styles.inputStyle : styles.disableInput
                    }
                    editable={changeProfile}
                    onChangeText={(text) =>
                      setUserFields({ ...userFields, newPassword: text })}
                  />
                  <Text
                    style={
                      checkTheme
                        ? styles.changePasswordInputTextLight
                        : styles.changePasswordInputTextDark
                    }
                  >
                    Confirm New Password
                  </Text>
                  <TextInput
                    secureTextEntry
                    style={
                      changeProfile ? styles.inputStyle : styles.disableInput
                    }
                    editable={changeProfile}
                    onChangeText={(text) =>
                      setUserFields({ ...userFields, confirmNewPassword: text })}
                  />
                  <TouchableOpacity
                    style={styles.savePasswordButton}
                    onPress={() => updatePassword(loggedUserInfo._id)}
                  >
                    <Text style={styles.secondaryButtonText}>
                      Save New Password
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          </View>
        </View>
      </ScrollViewBackground>
      {pickDateStatus ? (
        <View style={{ backgroundColor: 'white' }}>
          <TouchableOpacity>
            <AntIcon
              name="closecircle"
              color={checkTheme ? '#f43434' : '#1890ff'}
              size={30}
              onPress={() => {
                if (!birthdayDay || !birthdayMonth || !birthdayYear) {
                  // setBirthdayMonth(null);
                  // setBirthdayYear(null);
                  // setBirthdayDay(null);
                  setBirthdayInformation({
                    ...birthdayInformation,
                    birthdayDay: null,
                    birthdayMonth: null,
                    birthdayYear: null,
                  });
                  setPickDateStatus(false);
                } else {
                  setPickDateStatus(false);
                }
              }}
            />
          </TouchableOpacity>
          <BirthdayPicker
            selectedYear={2021}
            selectedMonth={0}
            selectedDay={1}
            yearsBack={50}
            onYearValueChange={(year) =>
              setBirthdayInformation({
                ...birthdayInformation,
                birthdayYear: year,
              })}
            onMonthValueChange={(month) => {
              setBirthdayInformation({
                ...birthdayInformation,
                birthdayMonth: month,
              });
            }}
            onDayValueChange={(day) =>
              setBirthdayInformation({ ...birthdayInformation, birthdayDay: day })}
          />
        </View>
      ) : null}
      <Footer navigation={navigation} />
    </>
  );
};

export default UserSettingsScreen;
