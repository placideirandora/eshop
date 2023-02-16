import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import {RootStackParamList} from '../../types';
import CustomTextInput from '../components/CustomTextInput';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        <View style={styles.headingInfoView}>
          <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.message}>Welcome back to the platform!</Text>
        </View>
      </View>
      <View style={styles.form}>
        <CustomTextInput placeholder="Email" />
        <CustomTextInput placeholder="Password" secureTextEntry />
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigate('Home')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigate('SignUp')}>
          <Text style={styles.signUpButtonText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  rootView: {
    padding: Spacing * 2,
  },
  headingInfoView: {
    alignItems: 'center',
  },
  heading: {
    fontSize: FontSize.xxLarge,
    color: Colors.primary,
    marginVertical: Spacing * 3,
  },
  message: {
    fontSize: FontSize.large,
  },
  form: {
    marginVertical: Spacing * 3,
    alignItems: 'center',
  },
  signInButton: {
    color: Colors.primary,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: '90%',
    borderRadius: Spacing,
    marginVertical: Spacing * 3,
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
    borderRadius: Spacing,
  },
  signUpButtonText: {
    fontSize: FontSize.large,
    textAlign: 'center',
    color: Colors.text,
  },
});
