import React from 'react';

import { TextInput } from 'react-native';

import styles from './styles';

const Input = (props) => {
  const [focused, setFocused] = React.useState(false);
  const { text } = props; // eslint-disable-line react/prop-types
  return (
    <TextInput
      placeholder={text}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={focused ? styles.focusedlogInInput : styles.logInInput}
      {...props}
    />
  );
};

export default Input;
