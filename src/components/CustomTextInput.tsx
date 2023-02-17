import React, {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';

const CustomTextInput: React.FC<TextInputProps> = ({...otherProps}) => {
  const [focusedInput, setFocusedInput] = useState<boolean>(false);

  return (
    <TextInput
      onFocus={() => setFocusedInput(true)}
      onBlur={() => setFocusedInput(false)}
      placeholderTextColor={Colors.darkText}
      style={[styles.textInput, focusedInput && styles.textInputFocused]}
      {...otherProps}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    width: '90%',
    marginVertical: Spacing,
    fontFamily: Fonts.regularMontSerrat,
  },
  textInputFocused: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
