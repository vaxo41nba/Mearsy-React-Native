import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const AddRegionComponent = ({
  userFields,
  checkTheme,
  currentRegion,
  setCurrentRegion,
  listOfCountries,
  listOfRegions,
  listOfStates,
  addCountryToTheList,
  removeCountryFromList,
  cancelAddingRegionHandler,
}) => {
  const [checkListOfStates, setCheckListOfStates] = useState(false);
  const [checkListOfCountries, setChecklistOfCountries] = useState(false);
  const [checkListOfRegions, setCheckListOfRegions] = useState(false);
  return (
    <View style={styles.subscribersListContainer}>
      {userFields.subscribeRegion.length > 0 ? (
        <TouchableOpacity
          style={
            checkTheme
              ? styles.userRegionsButtonLight
              : styles.userRegionsButtonDark
          }
        >
          {userFields.subscribeRegion.map((i) => (
            <TouchableOpacity
              onPress={() => removeCountryFromList(i.county)}
              style={styles.userSubscribersRegionListHolder}
              key={i.region}
            >
              <Text style={styles.regionText}>
                {i.country}
                ,
              </Text>
              <Text style={styles.regionText}>
                {i.state}
                ,
              </Text>
              <Text style={styles.regionText}>{i.county}</Text>
              <Icon
                style={styles.cancelIcon}
                name="cancel"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      ) : null}

      <View style={styles.regionListTextHolder}>
        <Text style={styles.regionListDot}>*</Text>
        <Text
          style={
            checkTheme ? styles.regionListTextLight : styles.regionListTextDark
          }
        >
          Country
        </Text>
      </View>
      {/* Countries List */}
      <TouchableOpacity
        style={
          checkTheme
            ? styles.regionListButtonLight
            : styles.regionListButtonDarK
        }
        onPress={() => {
          setChecklistOfCountries(!checkListOfCountries);
          setCurrentRegion({
            ...currentRegion,
            country: '',
            state: '',
            region: '',
          });
        }}
      >
        <Text>
          {!currentRegion.country ? 'Select country' : currentRegion.country}
        </Text>
      </TouchableOpacity>

      {checkListOfCountries ? (
        <ScrollView style={styles.countryListHolder}>
          {listOfCountries.map((i) => (
            <TouchableOpacity style={styles.countryButton} key={i.region}>
              onPress=
              {() => {
                setChecklistOfCountries(false);
                setCurrentRegion({ ...currentRegion, country: i });
              }}
              <Text>{i}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
      {/* State List */}
      {currentRegion.country ? (
        <>
          <View style={styles.regionListTextHolder}>
            <Text style={styles.regionListDot}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.regionListTextLight
                  : styles.regionListTextDark
              }
            >
              State
            </Text>
          </View>
          <TouchableOpacity
            style={
              checkTheme
                ? styles.regionListButtonLight
                : styles.regionListButtonDarK
            }
            onPress={() => {
              setCheckListOfStates(!checkListOfStates);
              setCurrentRegion({
                ...currentRegion,
                state: '',
              });
            }}
          >
            <Text>
              {!currentRegion.state ? 'Select state' : currentRegion.state}
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
      {checkListOfStates ? (
        <ScrollView style={styles.countryListHolder}>
          {listOfStates.map((i) => (
            <TouchableOpacity style={styles.countryButton} key={i.region}>
              onPress=
              {() => {
                setCheckListOfStates(false);
                setCurrentRegion({ ...currentRegion, state: i });
              }}
              <Text>{i}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
      {/* Regions List */}
      {currentRegion.state ? (
        <>
          <View style={styles.regionListTextHolder}>
            <Text style={styles.regionListDot}>*</Text>
            <Text
              style={
                checkTheme
                  ? styles.regionListTextLight
                  : styles.regionListTextDark
              }
            >
              Region
            </Text>
          </View>
          <TouchableOpacity
            style={
              checkTheme
                ? styles.regionListButtonLight
                : styles.regionListButtonDarK
            }
            onPress={() => {
              setCheckListOfRegions(!checkListOfRegions);
            }}
          >
            <Text>
              {!currentRegion.region ? 'Select Region' : currentRegion.region}
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
      {checkListOfRegions ? (
        <>
          <ScrollView style={styles.countryListHolder}>
            {listOfRegions.map((i) => (
              <TouchableOpacity
                style={styles.countryButton}
                key={i.region}
                onPress={() => {
                  setCheckListOfRegions(false);
                  setCurrentRegion({ ...currentRegion, region: i });
                }}
              >
                <Text>{i}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : null}
      <View style={styles.regionButtonsHolder}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancelAddingRegionHandler()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        {currentRegion.region ? (
          <TouchableOpacity
            style={styles.addRegionButton}
            onPress={() => addCountryToTheList(currentRegion)}
          >
            <Text style={styles.addRegionButtonText}>Add Region</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default AddRegionComponent;
