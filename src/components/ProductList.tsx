import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';

import {Product} from '../../types';
import ProductCard from './ProductCard';
import Spacing from '../constants/Spacing';
import PrimaryButton from './PrimaryButton';
import Colors from '../constants/Colors';

type Props = {
  products: Product[];
  handleLoadMore: Function;
  totalPages: number;
  currentPage: number;
  loadingMore: boolean;
};

const ProductList: React.FC<Props> = ({
  products,
  totalPages,
  currentPage,
  handleLoadMore,
  loadingMore,
}) => {
  const renderProduct = ({item}: {item: Product}) => {
    return <ProductCard product={item} />;
  };

  const renderFooter = () => {
    if (!loadingMore) {
      return (
        <PrimaryButton
          title="Load More"
          width="100%"
          backgroundColor={Colors.darkText}
          handlePress={() => handleLoadMore()}
        />
      );
    }
    return <ActivityIndicator size="small" color={Colors.darkText} />;
  };

  return (
    <FlatList
      style={{paddingHorizontal: Spacing * 3}}
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={totalPages > currentPage ? renderFooter : null}
    />
  );
};

export default ProductList;
