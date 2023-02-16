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

import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import {RootStackParamList} from '../../types';
import ShareButton from '../components/ShareButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<Props> = ({route}) => {
  const {product} = route.params;

  const onShare = async () => {
    const productUrl = 'https://www.beatsbydre.com/earbuds/powerbeats-pro';
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
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.shortDescription}>
            {product.shortDescription}
          </Text>
          <Text style={styles.category}>Category: {product.category}</Text>
          <Text style={styles.manufacturingDate}>
            Manufactured on: {product.manufacturingDate}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.shareButtonView}>
        <ShareButton handlePressed={onShare} size="30" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productDetailView: {
    flex: 1,
    padding: Spacing,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: Spacing * 2,
  },
  detailsContainer: {
    paddingHorizontal: Spacing * 2,
  },
  title: {
    fontSize: FontSize.xxLarge,
    fontWeight: 'bold',
    marginBottom: Spacing,
    color: Colors.primary,
  },
  price: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    marginBottom: Spacing,
  },
  shortDescription: {
    fontSize: FontSize.medium,
    marginBottom: Spacing,
    color: Colors.darkText,
  },
  category: {
    fontSize: FontSize.small,
    marginBottom: Spacing,
  },
  manufacturingDate: {
    fontSize: FontSize.small,
    marginBottom: Spacing,
  },
  shareButtonView: {
    position: 'absolute',
    bottom: 35,
    right: 35,
  },
});

export default ProductDetailScreen;
