import axios from 'axios';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import {apiBaseUrl} from '../constants/Api';
import FontSize from '../constants/FontSize';
import {RootStackParamList, User} from '../../types';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import CustomTextInput from '../components/CustomTextInput';
import MissingFieldAlert from '../components/FieldErrorAlert';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [shouldDisplayErrorMessage, setShouldDisplayErrorMessage] =
    useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const validateFields = () => {
    const fieldsToValidate = [
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

    if (shouldDisplayMessage) {
      setShouldDisplayErrorMessage(true);
      return;
    }

    authenticateUser();
  };

  const authenticateUser = async () => {
    try {
      setLoading(true);

      const url = `${apiBaseUrl}/auth/signin`;
      const payload = {
        email,
        password,
      };

      const res = await axios.post(url, payload);

      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Welcome!',
      });
      await saveUserInfo(res.data.data);
    } catch (error: any) {
      setLoading(false);
      let message;
      if (error.response.data) {
        message = error.response.data.message;
      } else {
        message = 'Could not authenticate you';
      }
      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  };

  const saveUserInfo = async (user: User) => {
    try {
      await AsyncStorage.setItem('userId', user.id);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('userAccountType', user.accountType as string);
      navigate('Home');
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Could not sign you in due to our internal error',
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        <View style={styles.headingInfoView}>
          <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.message}>Welcome back to the platform!</Text>
        </View>
      </View>
      <View style={styles.form}>
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
        {loading && (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={{marginVertical: Spacing}}
          />
        )}
        {!loading && (
          <>
            <PrimaryButton
              title="Sign In"
              width="90%"
              handlePress={validateFields}
            />
            <SecondaryButton
              title="Don't have an account? Register"
              handlePress={() => navigate('SignUp')}
            />
          </>
        )}
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
});
