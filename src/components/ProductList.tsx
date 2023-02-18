import React from 'react';
import {FlatList} from 'react-native';

import {Product} from '../../types';
import ProductCard from './ProductCard';
import Spacing from '../constants/Spacing';

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
