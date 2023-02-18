import axios from 'axios';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import {apiBaseUrl} from '../constants/Api';
import FontSize from '../constants/FontSize';
import {RootStackParamList} from '../../types';
import CustomTextInput from '../components/CustomTextInput';
import MissingFieldAlert from '../components/FieldErrorAlert';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({navigation: {navigate, reset}}) => {
  const [accountType, setAccountType] = useState<RadioButtonProps[]>([
    {
      id: '1',
      label: 'Client',
      value: 'client',
      selected: false,
      labelStyle: {fontFamily: Fonts.regularMontSerrat},
    },
    {
      id: '2',
      label: 'Seller',
      value: 'seller',
      selected: false,
      labelStyle: {fontFamily: Fonts.regularMontSerrat},
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [shouldDisplayErrorMessage, setShouldDisplayErrorMessage] =
    useState<boolean>(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] =
    useState<string>('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<string>('');
  const [accountTypeErrorMessage, setAccountTypeErrorMessage] =
    useState<string>('');

  const validateFields = () => {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i;

    const fieldsToValidate = [
      {
        value: firstName,
        errorMessageSetter: setFirstNameErrorMessage,
        errorMessage: 'First name is required',
      },
      {
        value: lastName,
        errorMessageSetter: setLastNameErrorMessage,
        errorMessage: 'Last name is required',
      },
      {
        value: email,
        errorMessageSetter: setEmailErrorMessage,
        errorMessage: 'Email is required',
      },
      {
        value: password,
        errorMessageSetter: setPasswordErrorMessage,
        errorMessage: 'Password is required',
      },
      {
        value: confirmPassword,
        errorMessageSetter: setConfirmPasswordErrorMessage,
        errorMessage: 'Confirm Password is required',
      },
    ];

    let shouldDisplayMessage = false;

    fieldsToValidate.forEach(({value, errorMessageSetter, errorMessage}) => {
      if (!value) {
        errorMessageSetter(errorMessage);
        shouldDisplayMessage = true;
      } else {
        errorMessageSetter('');
      }
    });

    if (email && !email.match(emailRegex)) {
      setEmailErrorMessage('Invalid email');
      shouldDisplayMessage = true;
    }

    if (password && password.length < 6) {
      setPasswordErrorMessage('Password must contain at least 6 characters');
      shouldDisplayMessage = true;
    }

    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordErrorMessage(
        'This password does not match the above one',
      );
      shouldDisplayMessage = true;
    }

    const accountTypeNotSelected = accountType.every(acc => {
      return acc.selected === false;
    });

    if (accountTypeNotSelected) {
      setAccountTypeErrorMessage('Account type is required');
      shouldDisplayMessage = true;
    } else {
      setAccountTypeErrorMessage('');
    }

    if (shouldDisplayMessage) {
      setShouldDisplayErrorMessage(true);
      return;
    }

    registerUser();
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      const url = `${apiBaseUrl}/auth/signup`;
      const payload = {
        firstName,
        lastName,
        email,
        password,
        accountType: accountType.find(acc => acc.selected === true)?.value,
      };
      const res = await axios.post(url, payload);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    } catch (error: any) {
      setLoading(false);
      let message;
      if (error.response.data) {
        message = error.response.data.message;
      } else {
        message = 'Could not register you';
      }
      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.rootView}>
          <View style={styles.headingInfoView}>
            <Text style={styles.heading}>Register</Text>
            <Text style={styles.message}>
              Create account today and explore!
            </Text>
          </View>
        </View>
        <View style={styles.form}>
          <CustomTextInput
            placeholder="First name"
            value={firstName}
            onChangeText={value => setFirstName(value)}
          />
          {shouldDisplayErrorMessage && firstNameErrorMessage && (
            <MissingFieldAlert width="90%" message={firstNameErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Last name"
            value={lastName}
            onChangeText={value => setLastName(value)}
          />
          {shouldDisplayErrorMessage && lastNameErrorMessage && (
            <MissingFieldAlert width="90%" message={lastNameErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value.toLowerCase())}
          />
          {shouldDisplayErrorMessage && emailErrorMessage && (
            <MissingFieldAlert width="90%" message={emailErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={value => setPassword(value)}
          />
          {shouldDisplayErrorMessage && passwordErrorMessage && (
            <MissingFieldAlert width="90%" message={passwordErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={value => setConfirmPassword(value)}
          />
          {shouldDisplayErrorMessage && confirmPasswordErrorMessage && (
            <MissingFieldAlert
              width="90%"
              message={confirmPasswordErrorMessage}
            />
          )}
          <View style={styles.radioButtonsView}>
            <Text style={styles.accountType}>Select account type</Text>
            <RadioGroup
              radioButtons={accountType}
              onPress={value => setAccountType(value)}
            />
          </View>
          {shouldDisplayErrorMessage && accountTypeErrorMessage && (
            <MissingFieldAlert width="90%" message={accountTypeErrorMessage} />
          )}
          {loading && (
            <ActivityIndicator
              size="small"
              color={Colors.primary}
              style={{marginVertical: Spacing}}
            />
          )}
          {!loading && (
            <>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => validateFields()}>
                <Text style={styles.signUpButtonText}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => navigate('SignIn')}>
                <Text style={styles.signInButtonText}>
                  Already have an account? Sign In
                </Text>
              </TouchableOpacity>
            </>
          )}
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
    textTransform: 'uppercase',
    fontFamily: Fonts.semiBoldMontSerrat,
  },
  message: {
    fontSize: FontSize.large,
    fontFamily: Fonts.mediumMontSerrat,
  },
  form: {
    marginVertical: Spacing * 3,
    alignItems: 'center',
  },
  signUpButton: {
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
  signUpButtonText: {
    fontSize: FontSize.large,
    textAlign: 'center',
    color: Colors.onPrimary,
    fontFamily: Fonts.regularMontSerrat,
  },
  signInButton: {
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing,
  },
  signInButtonText: {
    fontSize: FontSize.medium,
    textAlign: 'center',
    color: Colors.text,
    fontFamily: Fonts.regularMontSerrat,
  },
  radioButtonsView: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: Spacing,
  },
  accountType: {
    marginVertical: Spacing,
    textTransform: 'capitalize',
    fontFamily: Fonts.regularMontSerrat,
  },
});
