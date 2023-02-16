import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {RootStackParamList} from '../../types';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import CustomTextInput from '../components/CustomTextInput';

const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'AddProduct'>;

const AddProductScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/eshop-banner.jpg')}
          resizeMode="cover"
        />
        <View style={styles.form}>
          <Text style={styles.heading}>Create Product</Text>
          <CustomTextInput placeholder="Name" />
          <CustomTextInput placeholder="Price" />
          <CustomTextInput placeholder="Short Description" />
          <CustomTextInput placeholder="Image (url)" />
          <CustomTextInput placeholder="Manufacturing Date" />
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  backgroundImage: {height: height / 6},
  heading: {
    fontSize: FontSize.large,
    color: Colors.primary,
    marginVertical: Spacing * 3,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  form: {
    marginVertical: Spacing * 3,
    alignItems: 'center',
  },
  createButton: {
    color: Colors.primary,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: '90%',
    borderRadius: Spacing,
    marginVertical: Spacing * 3,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  createButtonText: {
    fontSize: FontSize.large,
    textAlign: 'center',
    color: Colors.onPrimary,
  },
});
