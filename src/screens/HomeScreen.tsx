import axios from 'axios';
import Toast from 'react-native-toast-message';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import FAB from '../components/FAB';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import {apiBaseUrl} from '../constants/Api';
import FontSize from '../constants/FontSize';
import ProductList from '../components/ProductList';
import {RootStackParamList, Product, AccountType} from '../../types';

const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation: {navigate, reset}}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [accountType, setAccountType] = useState<AccountType>(null);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Could not sign you out due to our internal error',
      });
    }
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const accType = (await AsyncStorage.getItem(
        'userAccountType',
      )) as AccountType;
      setAccountType(accType);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${apiBaseUrl}/product`;
      const res = await axios.get(url, config);
      setProducts(res.data.data.products);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      let message;
      if (error.response.data) {
        message = error.response.data.message;
      } else {
        message = 'Could not fetch the products';
      }
      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        <View style={styles.signOutButtonView}>
          <TouchableOpacity onPress={() => handleSignOut()}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Available Products</Text>
        {loading && <ActivityIndicator size="small" color={Colors.primary} />}
        {!loading && <ProductList products={products} />}
        {accountType && accountType === 'seller' && (
          <View style={styles.fabView}>
            <FAB navigate={navigate} screen="AddProduct" />
          </View>
        )}
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
    fontFamily: Fonts.boldMontSerrat,
  },
  rootView: {
    height: '100%',
  },
  fabView: {
    position: 'absolute',
    bottom: Spacing * 2.5,
    right: Spacing * 2.5,
  },
  signOutButtonView: {
    alignItems: 'flex-end',
    paddingRight: Spacing * 2.5,
    paddingTop: Spacing * 2.5,
  },
  signOutButtonText: {
    color: Colors.danger,
    fontFamily: Fonts.mediumMontSerrat,
    fontSize: FontSize.medium,
  },
});
