import React, {useEffect, useCallback} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../types';
import Colors from '../constants/Colors';

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
    }, 3000);
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
        style={styles.container}
        size="large"
        color={Colors.primary}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundImage: {height: '100%'},
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});
