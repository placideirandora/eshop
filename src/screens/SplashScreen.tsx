import React, {useEffect, useCallback} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import {RootStackParamList} from '../../types';

const {height, width} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({navigation: {reset}}) => {
  const checkAuthStatus = useCallback(() => {
    const timeoutId = setTimeout(async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        return reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
      reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [reset]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/eshop-banner.jpg')}
        resizeMode="cover"
      />
      <ActivityIndicator
        style={styles.loaderView}
        size="large"
        color={Colors.primary}
      />
      <Text style={styles.appName}>eshop</Text>
      <Text style={styles.copyrightText}>
        ©2023 Placide IRANDORA. All rights reserved.
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundImage: {height: '100%'},
  loaderView: {
    position: 'absolute',
    top: '50%',
    left: width / 2.26,
  },
  appName: {
    position: 'absolute',
    top: height / 14,
    left: width / 2.52,
    fontFamily: Fonts.regularMontSerrat,
    color: Colors.primary,
    fontSize: FontSize.xLarge,
  },
  copyrightText: {
    position: 'absolute',
    bottom: height / 32,
    left: width / 8.5,
    fontFamily: Fonts.lightMontSerrat,
    color: Colors.primary,
  },
});
