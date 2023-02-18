import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';

type Props = {
  title: string;
  handlePress: Function;
};

const SecondaryButton: React.FC<Props> = ({title, handlePress}) => {
  return (
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={() => handlePress()}>
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  secondaryButton: {
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing,
  },
  secondaryButtonText: {
    fontSize: FontSize.medium,
    textAlign: 'center',
    color: Colors.text,
    fontFamily: Fonts.regularMontSerrat,
  },
});
