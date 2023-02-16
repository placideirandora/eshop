import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import {RootStackParamList} from '../../types';

const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'OnBoarding'>;

const OnBoardingScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  return (
    <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/eshop-banner.jpg')}
        resizeMode="cover"
      />
      {/* HEADING */}
      <View style={styles.headingView}>
        <Text style={styles.heading}>
          Connect with your favorite sellers here
        </Text>
      </View>
      {/* DESCRIPTION */}
      <View style={styles.descriptionView}>
        <Text style={styles.description}>
          Connect with your favorite sellers and discover the products you love
          on eshop.
        </Text>
      </View>
      {/* SIGN IN AND SIGN UP */}
      <View style={styles.buttonsView}>
        <TouchableOpacity
          onPress={() => navigate('SignIn')}
          style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('SignUp')}
          style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  backgroundImage: {height: height / 2.5},
  heading: {
    fontSize: FontSize.xxLarge,
    color: Colors.primary,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  headingView: {
    paddingHorizontal: Spacing * 4,
    paddingTop: Spacing * 4,
  },
  description: {
    fontSize: FontSize.medium,
    color: Colors.text,
    textAlign: 'center',
  },
  descriptionView: {
    paddingHorizontal: Spacing * 2,
    paddingTop: Spacing * 2,
  },
  buttonsView: {
    paddingHorizontal: Spacing * 2,
    paddingTop: Spacing * 6,
    flexDirection: 'row',
  },
  signInButton: {
    color: Colors.primary,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: '48%',
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  signInButtonText: {
    fontSize: FontSize.large,
    textAlign: 'center',
    color: Colors.onPrimary,
  },
  signUpButton: {
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: '48%',
    borderRadius: Spacing,
  },
  signUpButtonText: {
    fontSize: FontSize.large,
    textAlign: 'center',
    color: Colors.text,
  },
});
