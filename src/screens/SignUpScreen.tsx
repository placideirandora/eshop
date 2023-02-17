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

import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
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
    },
    {
      id: '2',
      label: 'Seller',
      value: 'seller',
      selected: false,
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [shouldDisplayMessage, setShouldDisplayMessage] =
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

    let firstNameError: string = '';
    let lastNameError: string = '';
    let emailError: string = '';
    let passwordError: string = '';
    let confirmPasswordError: string = '';
    let accountTypeError: string = '';

    if (!firstName) {
      firstNameError = 'First name is required';
    } else {
      firstNameError = '';
    }

    if (!lastName) {
      lastNameError = 'Last name is required';
    } else {
      lastNameError = '';
    }

    if (!email) {
      emailError = 'Email is required';
    } else {
      emailError = '';
    }

    if (!password) {
      passwordError = 'Password is required';
    } else {
      passwordError = '';
    }

    if (!confirmPassword) {
      confirmPasswordError = 'Confirm Password is required';
    } else {
      confirmPasswordError = '';
    }

    if (email && !email.match(emailRegex)) {
      emailError = 'Invalid email';
    }

    if (password && password.length < 6) {
      passwordError = 'Password must contain at least 6 characters';
    }

    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordError = 'This password does not match the above one';
    }

    const accountTypeNotSelected = accountType.every(acc => {
      return acc.selected === false;
    });

    if (accountTypeNotSelected) {
      accountTypeError = 'Account type is required';
    } else {
      accountTypeError = '';
    }

    if (firstNameError) {
      setFirstNameErrorMessage(firstNameError);
      return setShouldDisplayMessage(true);
    } else {
      setFirstNameErrorMessage('');
    }

    if (lastNameError) {
      setLastNameErrorMessage(lastNameError);
      return setShouldDisplayMessage(true);
    } else {
      setLastNameErrorMessage('');
    }

    if (emailError) {
      setEmailErrorMessage(emailError);
      return setShouldDisplayMessage(true);
    } else {
      setEmailErrorMessage('');
    }

    if (passwordError) {
      setPasswordErrorMessage(passwordError);
      return setShouldDisplayMessage(true);
    } else {
      setPasswordErrorMessage('');
    }

    if (confirmPasswordError) {
      setConfirmPasswordErrorMessage(confirmPasswordError);
      return setShouldDisplayMessage(true);
    } else {
      setConfirmPasswordErrorMessage('');
    }

    if (accountTypeError) {
      setAccountTypeErrorMessage(accountTypeError);
      return setShouldDisplayMessage(true);
    } else {
      setAccountTypeErrorMessage('');
    }

    registerUser();
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      const url = 'https://eshop-backend-4jkp.onrender.com/api/v1/auth/signup';
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
      console.log(error.response.data);
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
              Create account today and start exploring!
            </Text>
          </View>
        </View>
        <View style={styles.form}>
          <CustomTextInput
            placeholder="First name"
            value={firstName}
            onChangeText={value => setFirstName(value)}
          />
          {shouldDisplayMessage && firstNameErrorMessage && (
            <MissingFieldAlert width="90%" message={firstNameErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Last name"
            value={lastName}
            onChangeText={value => setLastName(value)}
          />
          {shouldDisplayMessage && lastNameErrorMessage && (
            <MissingFieldAlert width="90%" message={lastNameErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value.toLowerCase())}
          />
          {shouldDisplayMessage && emailErrorMessage && (
            <MissingFieldAlert width="90%" message={emailErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={value => setPassword(value)}
          />
          {shouldDisplayMessage && passwordErrorMessage && (
            <MissingFieldAlert width="90%" message={passwordErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={value => setConfirmPassword(value)}
          />
          {shouldDisplayMessage && confirmPasswordErrorMessage && (
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
          {shouldDisplayMessage && accountTypeErrorMessage && (
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
                style={styles.signInButton}
                onPress={() => validateFields()}>
                <Text style={styles.signInButtonText}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => navigate('SignIn')}>
                <Text style={styles.signUpButtonText}>
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
    fontSize: FontSize.medium,
    textAlign: 'center',
    color: Colors.text,
  },
  radioButtonsView: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: Spacing,
  },
  accountType: {marginVertical: Spacing, textTransform: 'capitalize'},
});
