import React from 'react';
import {FlatList} from 'react-native';

import {Product} from '../../types';
import Spacing from '../constants/Spacing';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
};

const ProductList: React.FC<Props> = ({products}) => {
  const sortedProducts = products.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  const renderProduct = ({item}: {item: Product}) => {
    return <ProductCard product={item} />;
  };

  return (
    <FlatList
      style={{paddingHorizontal: Spacing * 3}}
      data={sortedProducts}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ProductList;
