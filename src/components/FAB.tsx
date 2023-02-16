import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

type Props = {
  navigate: Function;
  screen: string;
};

const FAB: React.FC<Props> = ({navigate, screen}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigate(screen)}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 6V18"
          stroke="#fff"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M6 12H18"
          stroke="#fff"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FAB;
