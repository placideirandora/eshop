import axios from 'axios';
import Toast from 'react-native-toast-message';
import React, {useCallback, useEffect, useState} from 'react';
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
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
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

  const fetchMoreProducts = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await fetchProducts(nextPage, token);
      setTotalPages(data.totalPages);
      setProducts(prevProducts => [...prevProducts, ...data.products]);
      setPage(nextPage);
    } catch (error) {
      handleFetchError(error);
    }
  };

  const fetchProducts = async (targetPage: number, bToken: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bToken}`,
      },
    };
    const url = `${apiBaseUrl}/product?page=${targetPage}`;
    const response = await axios.get(url, config);
    return response.data.data;
  };

  const handleFetchError = (error: any) => {
    let message;
    if (error.response?.data) {
      message = error.response.data.message;
    } else {
      message = 'Could not fetch products';
    }
    Toast.show({
      type: 'error',
      text1: message,
    });
  };

  const fetchInitialData = useCallback(async () => {
    try {
      const bearerToken = await AsyncStorage.getItem('userToken');
      const accType = await AsyncStorage.getItem('userAccountType');
      setAccountType(accType as AccountType);
      setToken(bearerToken as string);
      const data = await fetchProducts(1, bearerToken as string);
      setTotalPages(data.totalPages);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleFetchError(error);
    }
  }, [setAccountType, setToken, setTotalPages, setProducts, setLoading]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        <View style={styles.signOutButtonView}>
          <TouchableOpacity onPress={() => handleSignOut()}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Available Products</Text>
        {!loading && (
          <ProductList
            products={products}
            handleLoadMore={fetchMoreProducts}
            totalPages={totalPages}
            currentPage={page}
            loadingMore={loadingMore}
          />
        )}
        {loading && <ActivityIndicator size="small" color={Colors.primary} />}
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
