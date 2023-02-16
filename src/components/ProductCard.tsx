import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Product} from '../../types';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({product}) => {
  const navigation = useNavigation();

  const handleProductPress = () => {
    navigation.navigate('ProductDetail', {product});
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handleProductPress}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.priceCategoryView}>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.price}>#{product.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.onPrimary,
    borderRadius: Spacing * 1.2,
    overflow: 'hidden',
    marginBottom: Spacing * 2,
    shadowColor: Colors.text,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    borderWidth: 1,
  },
  image: {
    height: 200,
    width: '100%',
  },
  title: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    margin: Spacing * 1.2,
  },
  price: {
    fontSize: FontSize.small,
    marginHorizontal: Spacing * 1.2,
    paddingBottom: Spacing,
  },
  priceCategoryView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductCard;
