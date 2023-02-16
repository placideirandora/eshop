import React from 'react';
import {SafeAreaView, View, Text, Dimensions, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import FAB from '../components/FAB';
import {dummyProducts} from '../data';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import {RootStackParamList} from '../../types';
import ProductList from '../components/ProductList';

const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        <Text style={styles.heading}>Available Products</Text>
        <ProductList products={dummyProducts} />
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
