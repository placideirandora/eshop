import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';

type Props = {
  title: string;
  width: string;
  handlePress: Function;
  backgroundColor: string;
};

const PrimaryButton: React.FC<Props> = ({
  title,
  handlePress,
  width,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.primaryButton, backgroundColor, width}}
      onPress={() => handlePress()}>
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    color: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing,
    marginVertical: Spacing * 3,
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  primaryButtonText: {
    fontSize: FontSize.large,
    textAlign: 'center',
    color: Colors.onPrimary,
    fontFamily: Fonts.regularMontSerrat,
  },
});

export default PrimaryButton;
