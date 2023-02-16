import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {
  SafeAreaView,
  ScrollView,
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

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  const [userTypes, setUserTypes] = useState<RadioButtonProps[]>([
    {
      id: '1',
      label: 'Seller',
      value: 'seller',
    },
    {
      id: '2',
      label: 'Client',
      value: 'client',
    },
  ]);

  const handleSelectUserType = (values: RadioButtonProps[]) => {
    setUserTypes(values);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.rootView}>
          <View style={styles.headingInfoView}>
            <Text style={styles.heading}>Register</Text>
            <Text style={styles.message}>
              Create account today and start exploring!
            </Text>
          </View>
        </View>
        <View style={styles.form}>
          <CustomTextInput placeholder="First name" />
          <CustomTextInput placeholder="Last name" />
          <CustomTextInput placeholder="Email" />
          <CustomTextInput placeholder="Password" secureTextEntry />
          <View style={styles.radioButtonsView}>
            <Text style={styles.accountType}>Select account type</Text>
            <RadioGroup
              radioButtons={userTypes}
              onPress={handleSelectUserType}
            />
          </View>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigate('SignIn')}>
            <Text style={styles.signInButtonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigate('SignIn')}>
            <Text style={styles.signUpButtonText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
  radioButtonsView: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '90%',
  },
  accountType: {marginVertical: Spacing, textTransform: 'capitalize'},
});
