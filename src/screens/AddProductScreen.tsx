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
  ActivityIndicator,
} from 'react-native';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import {apiBaseUrl} from '../constants/Api';
import FontSize from '../constants/FontSize';
import PrimaryButton from '../components/PrimaryButton';
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
  const [category, setCategory] = useState<ProductCategory>(null);

  const [shouldDisplayErrorMessage, setShouldDisplayErrorMessage] =
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
    const fieldsToValidate = [
      {
        value: name,
        errorMessageSetter: setNameErrorMessage,
        errorMessage: 'Name is required',
      },
      {
        value: price,
        errorMessageSetter: setPriceErrorMessage,
        errorMessage: 'Price is required',
      },
      {
        value: shortDescription,
        errorMessageSetter: setShortDescErrorMessage,
        errorMessage: 'Short description is required',
      },
      {
        value: image,
        errorMessageSetter: setImageErrorMessage,
        errorMessage: 'Image is required',
      },
      {
        value: manufacturingDate,
        errorMessageSetter: setManufacErrorMessage,
        errorMessage: 'Manufactoring date is required',
      },
      {
        value: category,
        errorMessageSetter: setCategErrorMessage,
        errorMessage: 'Category is required',
      },
    ];

    let shouldDisplayMessage = false;

    fieldsToValidate.forEach(({value, errorMessageSetter, errorMessage}) => {
      if (!value) {
        errorMessageSetter(errorMessage);
        shouldDisplayMessage = true;
      } else {
        errorMessageSetter('');
      }
    });

    if (shouldDisplayMessage) {
      setShouldDisplayErrorMessage(true);
      return;
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
      const url = `${apiBaseUrl}/product/add`;
      const payload = {
        name,
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
          {shouldDisplayErrorMessage && nameErrorMessage && (
            <MissingFieldAlert width="90%" message={nameErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Price"
            value={price}
            onChangeText={value => setPrice(value)}
          />
          {shouldDisplayErrorMessage && priceErrorMessage && (
            <MissingFieldAlert width="90%" message={priceErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Short Description"
            value={shortDescription}
            onChangeText={value => setShortDescription(value)}
          />
          {shouldDisplayErrorMessage && shortDescErrorMessage && (
            <MissingFieldAlert width="90%" message={shortDescErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Image (url)"
            value={image}
            onChangeText={value => setImage(value)}
          />
          {shouldDisplayErrorMessage && imageErrorMessage && (
            <MissingFieldAlert width="90%" message={imageErrorMessage} />
          )}
          <CustomTextInput
            placeholder="Manufacturing Date"
            value={manufacturingDate}
            onChangeText={value => setManufactoringDate(value)}
          />
          {shouldDisplayErrorMessage && manufacErrorMessage && (
            <MissingFieldAlert width="90%" message={manufacErrorMessage} />
          )}
          <SelectList
            setSelected={(value: ProductCategory) => setCategory(value)}
            data={productCategories}
            placeholder="Select category"
            boxStyles={styles.boxStyles}
            inputStyles={styles.inputStyles}
            dropdownTextStyles={styles.dropDownTextStyles}
          />
          {shouldDisplayErrorMessage && categErrorMessage && (
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
            <PrimaryButton
              title="Create"
              handlePress={validateFields}
              width="90%"
            />
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
    marginBottom: Spacing * 2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  form: {
    marginVertical: Spacing * 3,
    alignItems: 'center',
  },
  dropDownTextStyles: {
    fontFamily: Fonts.regularMontSerrat,
  },
  boxStyles: {marginVertical: Spacing, width: '86.5%'},
  inputStyles: {width: '90%', fontFamily: Fonts.regularMontSerrat},
});
