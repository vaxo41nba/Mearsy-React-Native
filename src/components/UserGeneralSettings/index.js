import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
} from 'react-native';

import styles from './styles';

const GeneralSettings = ({ navigation }) => {
  const checkCategs = [
    'Video',
    'Podcasts',
    'Liked Podcasts',
    'Feed',
    'Subscribers',
    'Subscriptions',
    'Tags',
    'Settings',
  ];
  return (
    <View>
      <View style={styles.optionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {checkCategs.map((i) => (
            <TouchableOpacity
              key={i}
              style={styles.optionsButton}
              onPress={() => navigation.navigate(`${i}`)}
            >
              <Text style={styles.options} key={i}>
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default GeneralSettings;
