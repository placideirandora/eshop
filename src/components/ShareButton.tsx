import React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

type Props = {
  handlePressed: Function;
  size: string;
};

const FAB: React.FC<Props> = ({handlePressed, size}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => handlePressed()}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G id="SVGRepo_bgCarrier" stroke-width="0" />
        <G
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <G id="SVGRepo_iconCarrier">
          <Path
            d="M8.68439 10.6578L15.3124 7.34378M15.3156 16.6578L8.69379 13.3469M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"
            stroke="#fff"
            stroke-width="1.5"
          />
        </G>
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.darkText,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FAB;
