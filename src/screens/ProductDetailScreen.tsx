import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  Alert,
} from 'react-native';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import {RootStackParamList} from '../../types';
import ShareButton from '../components/ShareButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<Props> = ({route}) => {
  const {product} = route.params;

  const onShare = async () => {
    const productUrl = product.image;
    try {
      const result = await Share.share({
        message: productUrl,
      });
      if (result.action === Share.sharedAction) {
        // shared
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.productDetailView}>
      <ScrollView>
        <Image source={{uri: product.image}} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceCategoryView}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.category}>#{product.category}</Text>
          </View>
          <Text style={styles.shortDescription}>
            {product.shortDescription}
          </Text>
          <Text style={styles.manufacturingDate}>
            Manufactured on: {product.manufacturingDate.split('T')[0]}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.shareButtonView}>
        <ShareButton handlePressed={onShare} size="30" />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  productDetailView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: Spacing * 2,
  },
  detailsContainer: {
    paddingHorizontal: Spacing * 2,
  },
  title: {
    fontSize: FontSize.xLarge,
    marginBottom: Spacing,
    color: Colors.primary,
    fontFamily: Fonts.semiBoldMontSerrat,
  },
  price: {
    fontSize: FontSize.large,
    marginBottom: Spacing,
    fontFamily: Fonts.mediumMontSerrat,
  },
  shortDescription: {
    fontSize: FontSize.medium,
    marginBottom: Spacing,
    color: Colors.darkText,
    fontFamily: Fonts.regularMontSerrat,
  },
  category: {
    fontSize: FontSize.small,
    marginBottom: Spacing,
    paddingTop: Spacing - 5,
    fontFamily: Fonts.mediumMontSerrat,
  },
  manufacturingDate: {
    fontSize: FontSize.small,
    marginBottom: Spacing,
    fontFamily: Fonts.mediumMontSerrat,
  },
  shareButtonView: {
    position: 'absolute',
    bottom: 35,
    right: 35,
  },
  priceCategoryView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
