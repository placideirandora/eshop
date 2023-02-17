import React from 'react';
import {FlatList} from 'react-native';

import {Product} from '../../types';
import Spacing from '../constants/Spacing';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
};

const ProductList: React.FC<Props> = ({products}) => {
  const renderProduct = ({item}: {item: Product}) => {
    return <ProductCard product={item} />;
  };

  return (
    <FlatList
      style={{paddingHorizontal: Spacing * 3}}
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ProductList;
