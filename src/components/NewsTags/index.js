import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const Tags = ({ tagName, getNewsByCategory }) => (
  // const [getActiveBtn, setActiveBtn] = useState(0);

  // const btn =
  //   getActiveBtn === 0
  //     ? styles.activeCategoriesButton
  //     : styles.chosenActiveCategoriesButton;

  <TouchableOpacity
    style={styles.activeCategoriesButton}
    onPress={() => getNewsByCategory(tagName)}
  >
    <Text style={styles.activeCategoriesButtonText}>{tagName}</Text>
  </TouchableOpacity>
);
export default Tags;
