import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../types';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FAB from '../components/FAB';

const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/eshop-banner.jpg')}
          resizeMode="cover"
        />
        <Text style={styles.heading}>Welcome to the Store</Text>
        <View style={styles.fabView}>
          <FAB navigate={navigate} screen="AddProduct" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {height: height / 6},
  heading: {
    fontSize: FontSize.large,
    color: Colors.primary,
    marginVertical: Spacing * 3,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  rootView: {
    height: '100%',
  },
  fabView: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});
