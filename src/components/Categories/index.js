import React from 'react';
import { useDispatch } from 'react-redux';

import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

import * as userActions from '../../redux/user/actions';

const Category = ({
  text,
  chosen,
  tag,
  isDisabled,
  settings,
  forceRender,
  setForceRender,
}) => {
  const dispatch = useDispatch();
  const selectCategories = () => {
    if (tag) {
      dispatch(userActions.selectTag(text));
    } else {
      dispatch(userActions.setSelectedCategories(text));
    }
  };

  return (
    <>
      {settings ? (
        <>
          {isDisabled ? (
            <TouchableOpacity
              style={
                chosen ? styles.chosenCategories : styles.disabledCategories
              }
              onPress={() => {
                dispatch(userActions.selectUserGeneralCategory(text));
                setForceRender(!forceRender);
              }}
            >
              <Text
                style={
                  chosen ? styles.chosenCategoriesText : styles.categoriesText
                }
              >
                {text}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled
              style={
                chosen ? styles.disabledchosenButton : styles.disabledButton
              }
            >
              <Text style={styles.chosenCategoriesText}>{text}</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <TouchableOpacity
          style={chosen ? styles.chosenCategories : styles.disabledCategories}
          onPress={() => {
            selectCategories();
          }}
        >
          <Text
            style={
              chosen ? styles.chosenCategoriesText : styles.categoriesText
            }
          >
            {text}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Category;
