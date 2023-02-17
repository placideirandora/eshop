import axios from 'axios';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {SelectList} from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  ActivityIndicator,
} from 'react-native';

import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import CustomTextInput from '../components/CustomTextInput';
import MissingFieldAlert from '../components/FieldErrorAlert';
import {ProductCategory, RootStackParamList} from '../../types';

const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'AddProduct'>;

const AddProductScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [manufacturingDate, setManufactoringDate] = useState<string>('');
  const [category, setCategory] = useState<ProductCategory>(undefined);

  const [shouldDisplayMessage, setShouldDisplayMessage] =
    useState<boolean>(false);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [priceErrorMessage, setPriceErrorMessage] = useState<string>('');
  const [shortDescErrorMessage, setShortDescErrorMessage] =
    useState<string>('');
  const [imageErrorMessage, setImageErrorMessage] = useState<string>('');
  const [manufacErrorMessage, setManufacErrorMessage] = useState<string>('');
  const [categErrorMessage, setCategErrorMessage] = useState<string>('');

  const productCategories: string[] = [
    'Electronics',
    'Clothing',
    'Beauty',
    'Sports & Outdoors',
    'Home & Kitchen',
    'Toys & Games',
  ];

  const validateFields = () => {
    let nameError: string = '';
    let priceError: string = '';
    let shortDescError: string = '';
    let imageError: string = '';
    let manufacDateError: string = '';
    let categoryError: string = '';

    if (!name) {
      nameError = 'Name is required';
    } else {
      nameError = '';
    }

    if (!price) {
      priceError = 'Price is required';
    } else {
      priceError = '';
    }

    if (!shortDescription) {
      shortDescError = 'Short description is required';
    } else {
      shortDescError = '';
    }

    if (!image) {
      imageError = 'Image url is required';
    } else {
      imageError = '';
    }

    if (!manufacturingDate) {
      manufacDateError = 'Manufacturing date is required';
    } else {
      manufacDateError = '';
    }

    if (!category) {
      categoryError = 'Category is required';
    } else {
      categoryError = '';
    }

    if (nameError) {
      setNameErrorMessage(nameError);
      return setShouldDisplayMessage(true);
    } else {
      setNameErrorMessage('');
    }

    if (priceError) {
      setPriceErrorMessage(priceError);
      return setShouldDisplayMessage(true);
    } else {
      setPriceErrorMessage('');
    }

    if (shortDescError) {
      setShortDescErrorMessage(shortDescError);
      return setShouldDisplayMessage(true);
    } else {
      setShortDescErrorMessage('');
    }

    if (imageError) {
      setImageErrorMessage(imageError);
      return setShouldDisplayMessage(true);
    } else {
      setImageErrorMessage('');
    }

    if (manufacDateError) {
      setManufacErrorMessage(manufacDateError);
      return setShouldDisplayMessage(true);
    } else {
      setManufacErrorMessage('');
    }

    if (categoryError) {
      setCategErrorMessage(categoryError);
      return setShouldDisplayMessage(true);
    } else {
      setCategErrorMessage('');
    }

    uploadProduct();
  };

  const uploadProduct = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const seller = await AsyncStorage.getItem('userId');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = 'https://eshop-backend-4jkp.onrender.com/api/v1/product/add';
      const payload = {
        title: name,
        price: parseFloat(price),
        shortDescription,
        image,
        manufacturingDate,
        category,
        seller,
      };
      const res = await axios.post(url, payload, config);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
      navigate('ProductDetail', {product: res.data.data});
    } catch (error: any) {
      setLoading(false);
      let message;
      if (error.response.data) {
        message = error.response.data.message;
      } else {
        message = 'Could not create the product. Try again later';
      }
      console.log(error.response.data);
      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  };

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
          <CustomTextInput
            placeholder="Name"
            value={name}
            onChangeText={value => setName(value)}
          />
          {shouldDisplayMessage && nameErrorMessage && (
            <MissingFieldAlert width="90%" message={nameErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Price"
            value={price}
            onChangeText={value => setPrice(value)}
          />
          {shouldDisplayMessage && priceErrorMessage && (
            <MissingFieldAlert width="90%" message={priceErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Short Description"
            value={shortDescription}
            onChangeText={value => setShortDescription(value)}
          />
          {shouldDisplayMessage && shortDescErrorMessage && (
            <MissingFieldAlert width="90%" message={shortDescErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Image (url)"
            value={image}
            onChangeText={value => setImage(value)}
          />
          {shouldDisplayMessage && imageErrorMessage && (
            <MissingFieldAlert width="90%" message={imageErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Manufacturing Date"
            value={manufacturingDate}
            onChangeText={value => setManufactoringDate(value)}
          />
          {shouldDisplayMessage && manufacErrorMessage && (
            <MissingFieldAlert width="90%" message={manufacErrorMessage} />
          )}
          <SelectList
            setSelected={(value: ProductCategory) => setCategory(value)}
            data={productCategories}
            placeholder="Select category"
          />
          {shouldDisplayMessage && categErrorMessage && (
            <MissingFieldAlert width="90%" message={categErrorMessage} />
          )}
          {loading && (
            <ActivityIndicator
              size="small"
              color={Colors.primary}
              style={{marginVertical: Spacing}}
            />
          )}
          {!loading && (
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => validateFields()}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          )}
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
