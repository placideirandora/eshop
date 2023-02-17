import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';

type Props = {
  width: string;
  message: string;
};

const FieldErrorAlert: React.FC<Props> = ({width, message}) => {
  return (
    <View style={{width}}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default FieldErrorAlert;

const styles = StyleSheet.create({
  message: {
    color: Colors.danger,
    fontSize: FontSize.small,
    textAlign: 'left',
  },
});
